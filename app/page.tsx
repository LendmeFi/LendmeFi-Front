<<<<<<< HEAD
=======

"use client";

>>>>>>> 635da287330fd1d6059ed4629029811609da1572
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

<<<<<<< HEAD
=======

import { useState } from "react";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { BrowserProvider, Contract, toNumber } from "ethers";
import { ethers } from "ethers";

import lendmefiAbi from "../data/LendmeFi_ABI.json";

interface LoanDetails {
  loanId: number;
  borrowerAddress: string;
  lenderAddress: string;
  nftCollateralAddress: string;
  nftTokenId: number;
  loanTokenAddress: string;
  loanAmount: string;
  interestFee: string;
  lendmeFiFee: string;
  loanStartTime: number;
  loanDuration: number;
}

function LoansComponent() {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [activeLoanByID, setActiveLoanByID] = useState<LoanDetails | null>(null);

  async function getLoans() {
    if (!isConnected) throw Error('User disconnected');
    if (!walletProvider) throw Error('Wallet provider is undefined');

    const ethersProvider = new BrowserProvider(walletProvider);
    // const signer = await ethersProvider.getSigner(); // not needed for now. read-only operations.

    const LendmeFiContract = new Contract(
      "0x201c11d25F3590De65DD72177D1f4AD364da1d3e",
      lendmefiAbi.abi, // Only use the ABI part
      ethersProvider
    );
    const numberofActiveLoans = await LendmeFiContract.numberofActiveLoans(); // this return the number of active loans, not the loans themselves. For example, if there are 5 active loans, it will return 5.
    const activeLoanByID = await LendmeFiContract.loans(0); // this will return the loan themselves by id. For example, if input id is 5, it will return the id = 5 loan. 
    /*  id = 0 loan example:
      [ loans(uint256) method Response ]
      loanId   uint256 :  0
      borrowerAddress   address :  0x8eBc758aBF8A3C49a5931383bB66a5B5dea4a919
      lenderAddress   address :  0x4347c8f4913D87a9E8AFA827B4871940c9bAce79
      nftCollateralAddress   address :  0x0c35e6F690EC8cF99c4509a2055066dEb043DF96
      nftTokenId   uint256 :  0
      loanTokenAddress   address :  0x913efbB29E9C2E3045A082D39B36896D82268977
      loanAmount   uint256 :  100000000000000000000
      interestFee   uint256 :  25000000000000000000
      lendmeFiFee   uint256 :  2000000000000000000
      loanStartTime   uint256 :  1722778325
      loanDuration   uint256 :  3600000
    */
    setActiveLoanByID({
      loanId: toNumber(activeLoanByID.loanId),
      borrowerAddress: activeLoanByID.borrowerAddress,
      lenderAddress: activeLoanByID.lenderAddress,
      nftCollateralAddress: activeLoanByID.nftCollateralAddress,
      nftTokenId: toNumber(activeLoanByID.nftTokenId),
      loanTokenAddress: activeLoanByID.loanTokenAddress,
      loanAmount: activeLoanByID.loanAmount.toString(),
      interestFee: activeLoanByID.interestFee.toString(),
      lendmeFiFee: activeLoanByID.lendmeFiFee.toString(),
      loanStartTime: toNumber(activeLoanByID.loanStartTime),
      loanDuration: toNumber(activeLoanByID.loanDuration)
    });
  }

  return (
    <div className="p-4">
      <button onClick={getLoans} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Get Active Loans By ID
      </button>
      {activeLoanByID && (
        <div className="mt-4 p-4 border rounded shadow-lg">
          <h2 className="text-xl font-bold mb-2">Active Loan Details</h2>
          <p><strong>Loan ID:</strong> {activeLoanByID.loanId}</p>
          <p><strong>Borrower Address:</strong> {activeLoanByID.borrowerAddress}</p>
          <p><strong>Lender Address:</strong> {activeLoanByID.lenderAddress}</p>
          <p><strong>NFT Collateral Address:</strong> {activeLoanByID.nftCollateralAddress}</p>
          <p><strong>NFT Token ID:</strong> {activeLoanByID.nftTokenId}</p>
          <p><strong>Loan Token Address:</strong> {activeLoanByID.loanTokenAddress}</p>
          <p><strong>Loan Amount:</strong> {ethers.formatEther(BigInt(activeLoanByID.loanAmount))} USDC</p>
          <p><strong>Interest Fee:</strong> {ethers.formatEther(BigInt(activeLoanByID.interestFee))} USDC</p>
          <p><strong>LendMeFi Fee:</strong> {ethers.formatEther(BigInt(activeLoanByID.lendmeFiFee))} USDC</p>
          <p><strong>Loan Start Time:</strong> {new Date(activeLoanByID.loanStartTime * 1000).toLocaleString()}</p>
          <p><strong>Loan Duration:</strong> {activeLoanByID.loanDuration / 3600} hours</p>
        </div>
      )}
    </div>
  );
};

>>>>>>> 635da287330fd1d6059ed4629029811609da1572
export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>LendMe</h1>
        <h1 className={title({ color: "violet" })}>Fi&nbsp;</h1>
        <br />
        <h2 className={subtitle({ class: "mt-4" })}>
          Beautiful, fast and modern way borrow nft.
        </h2>
<<<<<<< HEAD
=======
        <LoansComponent />
>>>>>>> 635da287330fd1d6059ed4629029811609da1572
      </div>
    </section>
  );
}
