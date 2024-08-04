import React, { useState, useEffect } from 'react';
import { BrowserProvider, ethers } from 'ethers';
import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react';

interface ListingDetails {
  borrowerAddress: string;
  borrowerNonce: number;
  nftCollateralAddress: string;
  nftTokenId: number;
  loanTokenAddress: string;
  loanAmount: bigint;
  interestFee: bigint;
  loanDuration: number;
  borrowerSignature: string;
}

const nftAbi = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];

const Nfts: React.FC = () => {
  const { address, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [nfts, setNfts] = useState<ListingDetails | null>(null); // This state is used to store the NFT details
  const [nftPicture, setNftPicture] = useState<string | null>(null);

  const convertIpfsUriToUrl = (uri: string) => {
    if (uri.startsWith("ipfs://")) {
      return `https://ipfs.io/ipfs/${uri.substring(7)}.png`;
    }
    return `${uri}.png`;
  };

  async function getNftPicture(contractAddress: string, tokenId: number) {
    if (!isConnected) throw new Error('User disconnected');
    if (!walletProvider) throw new Error('Wallet provider is undefined');
    
    const ethersProvider = new BrowserProvider(walletProvider);
    const nftContract = new ethers.Contract(contractAddress, nftAbi, ethersProvider);

    const uri = await nftContract.tokenURI(tokenId);
    const imageUrl = convertIpfsUriToUrl(uri);
    setNftPicture(imageUrl);
  }

  useEffect(() => {
    function addNft() {
      const nft = {
        borrowerAddress: '0x8eBc758aBF8A3C49a5931383bB66a5B5dea4a919',
        borrowerNonce: 1,
        nftCollateralAddress: '0x0c35e6F690EC8cF99c4509a2055066dEb043DF96',
        nftTokenId: 1,
        loanTokenAddress: '0x913efbB29E9C2E3045A082D39B36896D82268977',
        loanAmount: ethers.parseEther("100"),
        interestFee: ethers.parseEther("25"),
        loanDuration: 360000,
        borrowerSignature: '0xd7972e9afb7fcab65d9a7fa6879a9d9842918163f0039b1060c5dd53382cb4a00389dbc217071ce9b24e975a48fb497fdfe2e7bb9a3c302ca10425a6c7f700ca1b'
      };

      setNfts(nft);
    }

    addNft();
    getNftPicture('0x0c35e6F690EC8cF99c4509a2055066dEb043DF96', 1);
    getNftPicture('0x0c35e6F690EC8cF99c4509a2055066dEb043DF96', 2);
    getNftPicture('0x0c35e6F690EC8cF99c4509a2055066dEb043DF96', 3);
    
  }, [isConnected, walletProvider]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">NFT Details</h2>
      {nfts ? (
        <div className="mt-4 p-4 border rounded shadow-lg">
          {nftPicture && (
            <div className="mt-4 p-4 border rounded shadow-lg">
              <img src={nftPicture} alt="NFT" className="mt-4" />
            </div>
          )}
          <p><strong>Borrower Address:</strong> {nfts.borrowerAddress}</p>
          <p><strong>Borrower Nonce:</strong> {nfts.borrowerNonce}</p>
          <p><strong>NFT Collateral Address:</strong> {nfts.nftCollateralAddress}</p>
          <p><strong>NFT Token ID:</strong> {nfts.nftTokenId}</p>
          <p><strong>Loan Token Address:</strong> {nfts.loanTokenAddress}</p>
          <p><strong>Loan Amount:</strong> {ethers.formatEther(nfts.loanAmount)} ETH</p>
          <p><strong>Interest Fee:</strong> {ethers.formatEther(nfts.interestFee)} ETH</p>
          <p><strong>Loan Duration:</strong> {nfts.loanDuration / 3600} hours</p>
          <p><strong>Borrower Signature:</strong> {nfts.borrowerSignature}</p>
        </div>
      ) : (
        <p>No NFT data available</p>
      )}
    </div>
  );
};

export default Nfts;
