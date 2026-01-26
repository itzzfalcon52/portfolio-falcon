import React from 'react'
import Link from 'next/link'
import { House,CircleUserRound,FolderOpenDot,Handbag,Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

function Navbar() {
  return (
    <div className='w-full py-6 px-10  mt-4   bg-zinc-900 shadow-sm shadow-zinc-300 rounded-xl flex justify-between items-center'>

        <div className='text-white font-bold text-xl flex justify-center items-center gap-4'>
        <Link href={"/"} className='text-zinc-300 font-semibold text-lg flex items-center gap-2'>
            <House size={24} />

        </Link>
        <Link href={"/about"} className='text-zinc-300 font-semibold text-lg flex items-center gap-2'>
            <CircleUserRound size={24} />
        </Link>
        <Link href={"/projects"} className='text-zinc-300 font-semibold text-lg flex items-center gap-2'>
            <FolderOpenDot size={24} />
        </Link>
        <Link href={"/products"} className='text-zinc-300 font-semibold text-lg flex items-center gap-2'>
            <Handbag size={24} />
        </Link>

        </div>

        <div className='text-yellow-400 cursor-pointer flex justify-center items-center gap-4'>
            <div className='animate-pulse'>
                <Sun size={24} />
            </div>
            <Button variant="outline" size="sm" className='border-green-400 text-green-400 hover:bg-green-400 hover:text-zinc-900'>
                Hire Me
            </Button>
            

            

        </div>

      
    </div>
  )
}

export default Navbar
