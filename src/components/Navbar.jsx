"use client";

import { useSession } from "next-auth/react";

const NavBar = () => {
    const session = useSession();

    if (session.status === "unauthenticated"){
    return(     
        <nav class="bg-transparent">
            <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                    <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">AcadVault2.0</span>
                </a>
                <div class="flex items-center space-x-6 rtl:space-x-reverse">
                    <a href="https://github.com/AcadVault/AcadVault2.0" target="_blank" class="text-sm  text-gray-500 dark:text-white hover:underline">Github</a>
                    <a href="/login" class="text-sm  text-blue-600 dark:text-blue-500 hover:underline">SignIn</a>
                </div>
            </div>
        </nav>      
    )
    }else{
    return(
        <nav class="bg-transparent">
            <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                    <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">AcadVault2.0</span>
                </a>
                <div class="flex items-center space-x-6 rtl:space-x-reverse">
                    <a href="https://github.com/AcadVault/AcadVault2.0" target="_blank" class="text-sm  text-gray-500 dark:text-white hover:underline">Github</a>
                </div>
            </div>
        </nav>  
    )
    }
}

export default NavBar