import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';


const Sidebar = () => {


    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => setIsOpen(!isOpen);
    return (
        <div className={`transition-width relative duration-300 ${isOpen ? 'w-full' : 'w-20'} py-6 border-r-1 border-[#475467] h-screen bg-morSideBar`}>
            <button
                className="flex justify-center  align-middles rounded-[8px] absolute -right-3 text-[20px] text-white border-2 border-[#475467] px-[5px] "
                onClick={toggleSidebar}
            >
                {isOpen ? '>' : '<'}
            </button>
            <div className={`flex flex-col ${isOpen ? 'gap-4' : 'gap-2'}`}>
                <div className='text-white text-[16px] font-[600px] px-[16px]'>
                    History
                </div>
            </div>
        </div>
    )


}

export default Sidebar