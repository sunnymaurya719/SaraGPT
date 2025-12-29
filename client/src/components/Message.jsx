import React, { useEffect } from 'react'
import { assets } from '../assets/assets'
import moment from 'moment'
import Markdown from 'react-markdown';
import Prism from 'prismjs'
import remarkGfm from 'remark-gfm';
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-python";

const Message = ({ message }) => {
  const fixMarkdown = (text = "") => {
    return text
      // fix headings
      .replace(/###\s*(.*?)(?=\s[A-Z]|$)/g, "### $1\n\n")

      // fix "javascript code" blocks
      .replace(
        /javascript\s+([\s\S]*?)(?=\n[A-Z]|$)/g,
        "```javascript\n$1\n```"
      )

      // normalize spacing
      .replace(/\n{3,}/g, "\n\n");
  };


  return (
    <div>
      {
        message.role === "user" ? (
          <div className='flex items-center justify-end my-4 gap-2'>
            <div className='flex flex-col gap-2 p-2 px-4 bg-slate-50 dark:bg-[#57317C]/30 border border-[#80609F]/30 rounded-md max-w-2xl'>
              <p className='text-sm dark:text-primary'>{message.content}</p>
              <span className='text-xs text-gray-400 dark:text-[#B1A6C0]'>{moment(message.timestamp).fromNow()}</span>
            </div>
            <img src={assets.user_icon} alt='' className='w-8 rounded-full' />
          </div>
        ) : (
          <div className='inline-flex flex-col gap-2 p-2 px-4 max-w-2xl bg-primary/20 dark:bg-[#57317C]/30 border border-[#80609F]/30 rounded-md my-4'>
            {
              message.isImage ? (
                <img src={message.content} alt='' className='w-full max-w-md mt-2 rounded-md' />
              ) : (
                <div className="text-sm dark:text-primary reset-tw">
                  <Markdown
                  >
                    {fixMarkdown(message.content)}
                  </Markdown>
                </div>

              )
            }
            <span className='text-xs text-gray-400 dark:text-[#B1A6C0]'>{moment(message.timestamp).fromNow()}</span>
          </div>
        )
      }

    </div>
  )
}

export default Message