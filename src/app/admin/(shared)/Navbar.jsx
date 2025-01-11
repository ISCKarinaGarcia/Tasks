// /app/navbar.js
'use client';
import { signOut } from "next-auth/react";
import Link from 'next/link';
import {Plus,LogOut,Users,List} from 'lucide-react';
export default function Navbar() {
  function handleLogout() {
    console.log('saliendo');
    
    signOut({ callbackUrl: "/auth/login" })
  }
  return (
    <nav className='w-100 h-24 bg-zinc-50  shadow-lg'>
      <ul className='flex space-x-24 justify-center items-center h-full'>

        
        <button className='
        w-30 h-16
        cursor-pointer transition-all
        bg-gradient-to-r from-purple-400 to-blue-300 text-white px-6 py-2 rounded-lg
      border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] 
        hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]'
        ><Link href="/admin/tasks"><List className='text-white'>
          </List></Link>
        </button>

        <button className='
        w-30 h-16
        cursor-pointer transition-all
        bg-gradient-to-r from-purple-400 to-blue-300 text-white px-6 py-2 rounded-lg
      border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] 
        hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]'><Link href="/admin/tasks/new">
          <Plus className='text-white'></Plus></Link>
        </button>

        <button className='
        w-30 h-16
        cursor-pointer transition-all
        bg-gradient-to-r from-purple-400 to-blue-300 text-white px-6 py-2 rounded-lg
        border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] 
        hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]'>
        <Link href="/admin/users" >
          <Users className='text-white'></Users></Link>
        </button>

        <button className='
        w-30 h-16
        cursor-pointer transition-all
        bg-gradient-to-r from-purple-400 to-blue-300 text-white px-6 py-2 rounded-lg
        border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] 
        hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]' 
        onClick={handleLogout}><Link href="/" >
          <LogOut className='text-white'></LogOut></Link>
        </button>

      </ul>
    </nav>
  );
}
