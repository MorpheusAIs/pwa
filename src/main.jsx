import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '@rainbow-me/rainbowkit/styles.css';
import {
    rainbowWallet,
    walletConnectWallet,
    metaMaskWallet
} from '@rainbow-me/rainbowkit/wallets';

import {
    connectorsForWallets,
    darkTheme,
    getDefaultConfig,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider, createConfig } from 'wagmi';
import {
    arbitrum,
} from 'wagmi/chains';

import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";
import { BrowserRouter } from 'react-router-dom';

const connectors = connectorsForWallets(
    [
        {
            groupName: 'Recommended',
            wallets: [metaMaskWallet],
        },
    ],
    {
        appName: 'Morpheus',
        projectId: '8963c43b61ea22027f4438015cd57f8a',
    }
);

const config = createConfig({
    connectors,
    chains: [arbitrum],
});

// const config = getDefaultConfig({
//     appName: 'Morpheus',
//     projectId: '8963c43b61ea22027f4438015cd57f8a',
//     chains: [arbitrum],
//     ssr: true, // If your dApp uses server side rendering (SSR)
// });

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider theme={darkTheme()}>
                    <React.StrictMode>
                        <App />
                    </React.StrictMode>,
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    </BrowserRouter>
)
