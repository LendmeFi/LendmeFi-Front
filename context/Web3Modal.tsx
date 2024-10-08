// context/Web3Modal.tsx

"use client";

import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import { ReactNode } from "react";
// Your WalletConnect Cloud project ID
export const projectId = "20bc8a396f156e979d8de9c456ed840b";

// 2. Set chains
const scroll_sepolia = {
  chainId: 534351,
  name: "Scroll Sepolia Network",
  currency: "ETH",
  explorerUrl: "https://sepolia.scrollscan.com/",
  rpcUrl: "https://sepolia-rpc.scroll.io/",
};

// 3. Create a metadata object
const metadata = {
  name: "LendmeFi",
  description: "AppKit Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: false, // true by default
  rpcUrl: "...", // used for the Coinbase SDK
  defaultChainId: 534351, // used for the Coinbase SDK
});
// eslint-disable-next-line prettier/prettier

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [scroll_sepolia],
  projectId,
  enableAnalytics: false, // Optional - defaults to your Cloud configuration
  enableOnramp: false, // Optional - false as default
  enableSwaps: false,
});
// eslint-disable-next-line prettier/prettier

export default function Web3Modal({ children }: { children: ReactNode }) {
  return children;
}
