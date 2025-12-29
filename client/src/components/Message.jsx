import React, { useEffect } from 'react'
import { assets } from '../assets/assets'
import moment from 'moment'
import Markdown from 'react-markdown';
import Prism from 'prismjs'

const Message = ({ message }) => {
  
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
                <div className='text-sm dark:text-primary reset-tw'>
                  <Markdown
                    components={{
                      code({ inline, className, children }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                          <pre className={`language-${match[1]}`}>
                            <code
                              dangerouslySetInnerHTML={{
                                __html: Prism.highlight(
                                  String(children),
                                  Prism.languages[match[1]],
                                  match[1]
                                ),
                              }}
                            />
                          </pre>
                        ) : (
                          <code className="bg-black/20 px-1 rounded">
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {message.content}
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