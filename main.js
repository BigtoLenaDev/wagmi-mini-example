'use strict'

import { configureChains, connect, createConfig, InjectedConnector, mainnet } from '@wagmi/core'
import { publicProvider } from '@wagmi/core/providers/public'
import { WalletConnectConnector } from '@wagmi/core/connectors/walletConnect'
import { polygon } from "viem/chains";


const projectId = import.meta.env.VITE_PROJECT_ID

const { chains, publicClient, webSocketPublicClient } = configureChains(
    [polygon],
    [publicProvider()],
)

const walletConnectConnector = new WalletConnectConnector({
    chains,
    options: {
        projectId: projectId,
        isNewChainsStale: true,
        showQrModal: true,
    },
})

export const injectedConnector = new InjectedConnector({
    chains,
    options: {
        shimDisconnect: true
    }
})

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: [injectedConnector, walletConnectConnector],
    publicClient,
    webSocketPublicClient
});

document.getElementById('my-button').addEventListener('click', async () => {
    const { address } = await connect({
        connector: walletConnectConnector
    })
    console.log(`address: ${address}`)
})
