import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ConnectWallet } from './ConnectWallet';

const Header = () => {
    return (
        <div className='w-full py-[16px] px-[14px] bg-morLightBlue flex justify-between align-middle'>
            <div className='text-white flex flex-col justify-center align-middle h-full items-center'>
                LOGO
            </div>
            <div>
                <ConnectWallet />
            </div>
        </div>
    )
}

export default Header