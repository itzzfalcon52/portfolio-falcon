import React from 'react'
import { Card,CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Project from '@/components/helpers/Project'

function ProjectsCard() {

    const projects=[{
        image:"/HangoutX.png",
        title:"HangoutX-2D Metaverse App",
        description:"A 2D metaverse application enabling users to create avatars, explore virtual spaces, and interact with others in real-time.",
        github:"https://github.com/itzzfalcon52/HangoutX",
        link:"https://www.hangoutx.space/",
    },
    {
        image:"/SkillForge.png",
        title:"SkillForge - Online Coding Platform",
        description:"An online coding platform offering interactive coding challenges, tutorials, and a collaborative environment for developers to enhance their skills.",
        github:"https://github.com/itzzfalcon52/skill-forge",
        link:"https://skill-forge-orpin.vercel.app/",
    },
    {
        image:"/UmbrellaAlert.png",
        title:"Umbrella Alert - Weather Notification App",
        description:"A weather notification app that shows weather forecasts and lets user compare weathers of cities",
        github:"https://github.com/itzzfalcon52/React--Weather_app",
        link:"https://umbrellaalert.netlify.app/"
    }
]

return (
    <div className='mt-4 font-mono'>
            <Card className='bg-white border-zinc-300 dark:bg-zinc-900 dark:border-zinc-700 w-full'>
                    <CardContent>
                         <div className='flex justify-between items-center text-zinc-900 dark:text-white font-mono text-lg'>
                            <h1 className='font-bold'>Projects</h1>
                            <Button variant="outline" size="sm" className='border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-zinc-900'>
                                    View All <span className='ml-2'>&rarr;</span>
                            </Button>
                         </div>

                            <div className='mt-4 space-y-4'>
                                {projects.map((project,index)=>(
                                    <Project 
                                        key={index}
                                        image={project.image}
                                        title={project.title}
                                        description={project.description}
                                        github={project.github}
                                        link={project.link}
                                    />
                                ))}
                            </div>
                    </CardContent>
            </Card>
    </div>
)
}

export default ProjectsCard