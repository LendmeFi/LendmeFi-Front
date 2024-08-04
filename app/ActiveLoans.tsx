import { useState } from 'react';
import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react';
import { BrowserProvider, Contract, toNumber } from 'ethers';
import { ethers } from "ethers";
import lendmefiAbi from '../data/LendmeFi_ABI.json';

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

const ActiveLoans: React.FC = () => {
  const { address, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [activeLoanByID, setActiveLoanByID] = useState<LoanDetails | null>(null);

  async function getLoans() {
    if (!isConnected) throw new Error('User disconnected');
    if (!walletProvider) throw new Error('Wallet provider is undefined');

    const ethersProvider = new BrowserProvider(walletProvider);

    const LendmeFiContract = new Contract(
      '0x201c11d25F3590De65DD72177D1f4AD364da1d3e',
      lendmefiAbi.abi,
      ethersProvider
    );
    const activeLoanByID = await LendmeFiContract.loans(0);
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
      <button
        onClick={getLoans}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Active Loans
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

export default ActiveLoans;