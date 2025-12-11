import {Perplexity} from '@perplexity-ai/perplexity_ai';

const ai = new Perplexity({
    apiKey:process.env.PERPLEXITY_API_KEY
})

export default ai;


