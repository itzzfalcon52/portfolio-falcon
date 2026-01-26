import React from 'react'
import { Card, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage } from "@/components/ui/avatar"

function Project({ image, description, title, github, link }) {
    return (
        <Card className='bg-zinc-800 border-zinc-700 w-full hover:scale-[1.02] transition-transform duration-200'>
            <CardContent>
                <div className='flex items-center'>
                    {/* Left Section: Details */}
                    <div className='flex flex-col flex-1'>
                        <CardTitle className='text-white font-bold text-xl mb-2'>{title}</CardTitle>
                        <CardDescription className='text-zinc-400 text-sm mb-4'>{description}</CardDescription>
                        <div className='flex space-x-4'>
                            <a href={github} target="_blank" rel="noopener noreferrer" className='text-blue-400 hover:underline text-sm'>
                                GitHub Repo
                            </a>
                            <a href={link} target="_blank" rel="noopener noreferrer" className='text-green-400 hover:underline text-sm'>
                                Live Demo
                            </a>
                        </div>
                    </div>

                    {/* Right Section: Image */}
                    <Avatar className='w-24 h-24 rounded-full ml-6'>
                        <AvatarImage src={image} alt={title} className="rounded-full" />
                    </Avatar>
                </div>
            </CardContent>
        </Card>
    )
}

export default Project
