
"use client";

import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

import Nfts from './Nfts';
import ActiveLoans from './ActiveLoans';
import styles from './Home.module.css';

import { useState } from "react";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { BrowserProvider, Contract, toNumber } from "ethers";
import { ethers } from "ethers";

export default function Home() {
  const [activeTab, setActiveTab] = useState<'nfts' | 'activeLoans'>('nfts');

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>LendMe</h1>
        <h1 className={title({ color: "violet" })}>Fi&nbsp;</h1>
        <br />
        <h2 className={subtitle({ class: "mt-4" })}>
          Beautiful, fast and modern way borrow nft.
        </h2>
      </div>

      {/* Navbar */}
      <nav className="w-full bg-gray-800 p-4 text-white">
        <ul className="flex justify-center space-x-4">
          <li>
            <button 
              onClick={() => setActiveTab('nfts')}
              className={`px-4 py-2 rounded ${activeTab === 'nfts' ? 'bg-blue-600' : 'bg-gray-700'}`}
            >
              NFT'ler
            </button>
          </li>
          <li>
            <button 
              onClick={() => setActiveTab('activeLoans')}
              className={`px-4 py-2 rounded ${activeTab === 'activeLoans' ? 'bg-blue-600' : 'bg-gray-700'}`}
            >
              Active Loans
            </button>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="mt-8">
        {activeTab === 'nfts' && <Nfts />}
        {activeTab === 'activeLoans' && <ActiveLoans />}
      </main>
    </section>
  );
}