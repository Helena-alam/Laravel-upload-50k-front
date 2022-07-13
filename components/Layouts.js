import React from 'react'
import Link from 'next/link';

export default function Index({children}) {
  return (
    
    <div>
        <Link href="/">
              <a className="mx-2 font-semibold">Home</a>
        </Link>
        <Link href="/upload">
              <a className="mx-2 font-semibold">Upload</a>
        </Link>
        <div className="flex h-screen text-xl font-bold flex min-h-screen items-center justify-start bg-white">
        <div className="m-auto">
            {children}        
        </div>      
        </div>          
    </div>
    
  )
}