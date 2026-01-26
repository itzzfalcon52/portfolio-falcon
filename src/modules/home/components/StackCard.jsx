import React from 'react'
import { Card,CardContent,CardHeader } from '@/components/ui/card'
import Image from 'next/image';

const frontend=[{
  name:"HTML 5",
  image:"/html-5.png"
},
{
  name:"CSS 3",
  image:"/css-3.png"
},
{
  name:"JavaScript",
  image:"/js.png"
},
{
  name:"React",
  image:"/react.png"
},
{
  name:"Tailwind CSS",
  image:"/tailwindcss.png"
},
{
  name:"Zustand",
  image:"/zustand.png"
},
{
  name:"Framer Motion",
  image:"/framer.png"
},
{
  name:"Next.js",
  image:"/nextjs.png"
},
{
  name:"shadcn/ui",
  image:"/shadcn.png"
}
]

const backend=[{
  name:"Node.js",
  image:"/node-js.png"
},
{
  name:"Express.js",
  image:"/express.png"
},
{
  name:"MongoDB",
  image:"/mongodb.png"
},
{
  name:"PostgreSQL",
  image:"/postgres.png"
},
{
  name:"prisma",
  image:"/prisma.png"
},
{
  name:"webSocket",
  image:"/websocket.png"
},
{
  name:"webRTC",
  image:"/webrtc.png"
}
]

function StackCard() {
  return (
    <div className='mt-4 font-mono'>
      <Card className='bg-white border-zinc-300 dark:bg-zinc-900 dark:border-zinc-700 w-full'>
        <CardHeader>
          <h2 className='text-zinc-900 dark:text-white text-2xl font-bold'>My Tech Stack</h2>
        </CardHeader>
        <CardContent className='text-zinc-600 dark:text-zinc-400 flex flex-col justify-center items-start gap-4'>
          <Card className='bg-zinc-50 border-zinc-300 dark:bg-zinc-800 dark:border-zinc-700 w-full p-4 hover:scale-[1.02] transition-transform duration-200'>
            <CardHeader>
              <h3 className='text-zinc-900 dark:text-white text-lg font-bold'>Frontend</h3>
            </CardHeader>
            <CardContent>
              <div className='mt-4 grid grid-cols-3 sm:grid-cols-5 gap-4'>
                {frontend.map((tech, index) => (
                  <div
                    key={index}
                    className='flex flex-col justify-center items-center gap-2 group'
                  >
                    <div className='relative'>
                      <div className='w-12 h-12 rounded-full overflow-hidden bg-white dark:bg-zinc-700'>
                        <Image
                          src={tech.image}
                          alt={tech.name}
                          width={48}
                          height={48}
                          className='w-full h-full object-cover'
                        />
                      </div>
                      <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-zinc-800 dark:bg-gray-800 text-zinc-100 dark:text-gray-300 text-xs px-2 py-1 rounded whitespace-nowrap'>
                        {tech.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className='bg-zinc-50 border-zinc-300 dark:bg-zinc-800 dark:border-zinc-700 w-full p-4 hover:scale-[1.02] transition-transform duration-200'>
            <CardHeader>
              <h3 className='text-zinc-900 dark:text-white text-lg font-bold'>Backend</h3>
            </CardHeader>
            <CardContent>
              <div className='mt-4 grid grid-cols-3 sm:grid-cols-5 gap-4'>
                {backend.map((tech, index) => (
                  <div
                    key={index}
                    className='flex flex-col justify-center items-center gap-2 group'
                  >
                    <div className='relative'>
                      <div className='w-12 h-12 rounded-full overflow-hidden bg-white dark:bg-zinc-700'>
                        <Image
                          src={tech.image}
                          alt={tech.name}
                          width={48}
                          height={48}
                          className='w-full h-full object-cover'
                        />
                      </div>
                      <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-zinc-800 dark:bg-gray-800 text-zinc-100 dark:text-gray-300 text-xs px-2 py-1 rounded whitespace-nowrap'>
                        {tech.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}

export default StackCard;