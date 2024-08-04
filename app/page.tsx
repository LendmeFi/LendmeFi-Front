"use client";

import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

import Nfts from "./Nfts";
import ActiveLoans from "./ActiveLoans";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

import { useState } from "react";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { BrowserProvider, Contract, toNumber } from "ethers";
import { ethers } from "ethers";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"nfts" | "activeLoans">("nfts");

  return (
    <section className="flex flex-col items-center justify-center gap-8 py-12 md:py-16">
      <div className="inline-block max-w-lg text-center">
        <h1 className={title()}>LendMe</h1>
        <h1 className={title({ color: "violet" })}>Fi&nbsp;</h1>
        <br />
        <h2 className={subtitle({ class: "mt-6" })}>
          Beautiful, fast and modern way to borrow NFTs.
        </h2>
      </div>

      <div className="w-full max-w-4xl">
        <Tabs
          aria-label="Options"
          onChange={(key) => setActiveTab(key as "nfts" | "activeLoans")}
          className="w-full"
        >
          <Tab
            key="nfts"
            title="NFT'ler"
            className="text-xl font-semibold"
          >
            <Card className="p-8">
              <CardBody>
                <Nfts />
              </CardBody>
            </Card>
          </Tab>
          <Tab
            key="activeLoans"
            title="Active Loans"
            className="text-xl font-semibold"
          >
            <Card className="p-8">
              <CardBody>
                <ActiveLoans />
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </section>
  );
}
