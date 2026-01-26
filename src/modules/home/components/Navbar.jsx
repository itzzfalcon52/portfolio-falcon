"use client";
import React from 'react'
import Link from 'next/link'
import { House,CircleUserRound,FolderOpenDot,Handbag,Sun,Moon,NotebookPen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'

function Navbar() {

    const {theme,setTheme,systemTheme}=useTheme();

    const currentTheme=theme==="system"?systemTheme:theme;
    const isDark=currentTheme==="dark"; //return true or false

    const toggleTheme = () => setTheme(isDark ? "light" : "dark");
  return (
    <div className='w-full py-6 px-10  mt-4   dark:bg-zinc-900 bg-zinc-200  shadow-sm dark:shadow-zinc-300 shadow-zinc-800 rounded-xl flex justify-between items-center'>

        <div className='text-white font-bold text-xl flex justify-center items-center gap-4'>
        <Link href={"/"} className='dark:text-zinc-300 text-zinc-800 font-semibold text-lg flex items-center gap-2 hover:-translate-y-0.5'>
            <House size={24} />

        </Link>
        <Link href={"/about"} className='dark:text-zinc-300  text-zinc-800 font-semibold text-lg flex items-center gap-2 hover:-translate-y-0.5'>
            <CircleUserRound size={24} />
        </Link>
        <Link href={"/projects"} className='dark:text-zinc-300  text-zinc-800 font-semibold text-lg flex items-center gap-2 hover:-translate-y-0.5'>
            <FolderOpenDot size={24} />
        </Link>
        <Link href={"/blog"} className='dark:text-zinc-300  text-zinc-800 font-semibold text-lg flex items-center gap-2 hover:-translate-y-0.5'>
            <NotebookPen size={24} />
        </Link>

        </div>

        <div className='text-yellow-400 cursor-pointer flex justify-center items-center gap-4 hover:-translate-y-0.5'>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="text-yellow-400 dark:text-zinc-200 cursor-pointer hover:-translate-y-0.5 transition-transform"
        >
          {isDark ? <Moon size={24} /> : <Sun size={24} />}
        </button>
            <Button variant="outline" size="sm" className='border-green-400 text-green-400 bg-zinc-600 dark:bg-none hover:bg-green-400 hover:text-zinc-50 hover:-translate-y-0.5'>
                Hire Me
            </Button>
            

            

        </div>

      
    </div>
  )
}

export default Navbar
