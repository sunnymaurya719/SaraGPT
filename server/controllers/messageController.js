import ai from '../configs/perplexityai.js';
import Chat from '../models/Chat.js';
import User from '../models/User.js';
import axios from 'axios';
import imagekit from '../configs/imagekit.js';


//Text-based Ai Chat Message Controller
export const textMessageController = async (req, res) => {
    try {
        const userId = req.user._id;

        if (req.user.credits < 1) {
            return res.json({ success: false, message: "Not enough credits" });
        }
        const { chatId, prompt } = req.body;

        console.log("Prompt:", prompt);

        const chat = await Chat.findOne({ userId, _id: chatId });
        chat.messages.push({
            isImage: false,
            role: 'user',
            content: prompt,
            timestamp: Date.now()
        });

        //call perplexity with previous Msgs  (Memory)
        const formattedMessages = chat.messages
            .filter(msg => !msg.isImage) // skip image messages
            .slice(-3)                  // limit memory (VERY IMPORTANT)
            .map(msg => ({
                role: msg.role.toLowerCase(), // 'user' | 'assistant'
                content: msg.content
            }));


        const completion = await ai.chat.completions.create({
            model: "sonar-pro",
            messages: formattedMessages
        })

        console.log(completion.choices[0].message.content);

        const Airesponse = completion.choices[0].message.content;



        const reply = { role: 'Assistant', content: Airesponse, timestamp: Date.now(), isImage: false }
        res.json({ success: true, reply });
        chat.messages.push(reply);
        await chat.save();
        await User.updateOne({ _id: userId }, { $inc: { credits: -1 } });

    } catch (error) {
        res.json({ success: false, error: error });
    }
}



//Image Generation Message Controller
export const imageMessageController = async (req, res) => {
    try {
        const userId = req.user._id;
        if (req.user.credits < 2) {
            return res.json({ success: false, message: "Not enough credits" });
        }
        const { prompt, chatId, isPublished } = req.body;

        //Find chat
        const chat = await Chat.findOne({ userId, _id: chatId });
        //push user message to chat
        chat.messages.push({
            role: 'user',
            content: prompt,
            isImage: false,
            timestamp: Date.now()
        });

        //Encode the prompt 
        const encodedPrompt = encodeURIComponent(prompt);

        //construct Imagekit AI generation URL
        const generatedImageUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/SaraGPT/${Date.now()}.png?tr=w-800,h-800`;

        const AiImageResponse = await axios.get(generatedImageUrl, { responseType: 'arraybuffer' });

        //Convert image data to base64
        const base64Image = `data:image/png;base64,${Buffer.from(AiImageResponse.data, "binary").toString('base64')}`

        //Upload to Imagekit Media Storage
        const uploadResponse = await imagekit.upload({
            file: base64Image,
            fileName: `${Date.now()}.png`,
            folder: 'SaraGPT'
        })
        const reply = {
            role: 'assistant',
            content: uploadResponse.url,
            timestamp: Date.now(),
            isImage: true,
            isPublished
        }
        res.json({ success: true, reply });

        chat.messages.push(reply);
        await chat.save();
        await User.updateOne({ _id: userId }, { $inc: { credits: -2 } });


    } catch (error) {
        res.json({ success: false, error: error.message });
    }
}
