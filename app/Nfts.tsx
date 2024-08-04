import React, { useState, useEffect } from 'react';
import { BrowserProvider, ethers } from 'ethers';
import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User } from "@nextui-org/react";


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

const nftData: ListingDetails = {
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

const convertIpfsUriToUrl = (uri: string) => {
  if (uri.startsWith("ipfs://")) {
    return `https://ipfs.io/ipfs/${uri.substring(7)}.png`;
  }
  return `${uri}.png`;
};

// Dummy data for demonstration
const nftPicture = convertIpfsUriToUrl('ipfs://example_nft_image_uri');

const NftTable: React.FC = () => {
  return (
    <Table aria-label="NFT Details">
      <TableHeader columns={[
        { uid: 'nftPicture', name: 'NFT Picture' },
        { uid: 'borrowerAddress', name: 'Borrower Address' },
        { uid: 'nftTokenId', name: 'NFT Token ID' },
        { uid: 'loanAmount', name: 'Amount' },
        { uid: 'interestFee', name: 'Interest Fee' },
        { uid: 'loanDuration', name: 'Duration' }
      ]}>
        {(column) => (
          <TableColumn key={column.uid} align="start">
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={[nftData]}>
        {(item) => (
          <TableRow key={item.nftTokenId}>
            <TableCell>
              <img src={nftPicture} alt="NFT" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
            </TableCell>
            <TableCell>{`${item.borrowerAddress.slice(0, 6)}...${item.borrowerAddress.slice(-4)}`}</TableCell>{/* shorten address */}
            <TableCell>{item.nftTokenId}</TableCell>
            <TableCell>{ethers.formatEther(item.loanAmount)} ETH</TableCell>
            <TableCell>{ethers.formatEther(item.interestFee)} ETH</TableCell>
            <TableCell>{item.loanDuration / 3600} hours</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default NftTable;
