"use client";

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Button, Image, useDisclosure } from "@nextui-org/react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    User,
} from "@nextui-org/react";
import nftAbi from "@/context/ContractAbi";
import UIModal from "../uiComponent/Modal";
import { on } from "events";
import { ListingDetails } from "@/types/ListingDetails";



const nftData: ListingDetails[] = [
    {
        borrowerAddress: "0x8eBc758aBF8A3C49a5931383bB66a5B5dea4a919",
        borrowerNonce: 1,
        nftCollateralAddress: "0x0c35e6F690EC8cF99c4509a2055066dEb043DF96",
        nftTokenId: 1,
        loanTokenAddress: "0x913efbB29E9C2E3045A082D39B36896D82268977",
        loanAmount: ethers.parseEther("100"),
        interestFee: ethers.parseEther("25"),
        loanDuration: 360000,
        borrowerSignature:
            "0xd7972e9afb7fcab65d9a7fa6879a9d9842918163f0039b1060c5dd53382cb4a00389dbc217071ce9b24e975a48fb497fdfe2e7bb9a3c302ca10425a6c7f700ca1b",
    },
    {
        borrowerAddress: "0x8eBc758aBF8A3C49a5931383bB66a5B5dea4a919",
        borrowerNonce: 1,
        nftCollateralAddress: "0x0c35e6F690EC8cF99c4509a2055066dEb043DF96",
        nftTokenId: 1,
        loanTokenAddress: "0x913efbB29E9C2E3045A082D39B36896D82268977",
        loanAmount: ethers.parseEther("100"),
        interestFee: ethers.parseEther("25"),
        loanDuration: 360000,
        borrowerSignature:
            "0xd7972e9afb7fcab65d9a7fa6879a9d9842918163f0039b1060c5dd53382cb4a00389dbc217071ce9b24e975a48fb497fdfe2e7bb9a3c302ca10425a6c7f700ca1b",
    },
];

const convertIpfsUriToUrl = (uri: string) => {
    if (uri.startsWith("ipfs://")) {
        console.log(`Converting IPFS URI to URL: ${uri}`);
        return `https://ipfs.io/ipfs/${uri.substring(7)}.png`;
    }
    return `${uri}.png`;
};

const NftTable: React.FC = () => {
    const [nfts, setNfts] = useState<ListingDetails | null>(null); // This state is used to store the NFT details
    const [nftPicture, setNftPicture] = useState("");
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleOnPress = () => {
        onOpen();
    };

    const getNftPicture = async (contractAddress: string, tokenId: number) => {
        const ethersProvider = new ethers.JsonRpcProvider(
            "https://sepolia-rpc.scroll.io/",
        );
        const nftContract = new ethers.Contract(
            contractAddress,
            nftAbi,
            ethersProvider,
        );

        try {
            let data = await nftContract.tokenURI(tokenId);
            let url = convertIpfsUriToUrl(data);
            setNftPicture(url);
        } catch (error: any) {
            console.log(error.message);
        }
        // let url = `https://ipfs.io/ipfs/${contractAddress}/${tokenId}.png`;
        // await setNftPicture(url);
    };

    function addNft() {
        const nft = {
            borrowerAddress: "0x8eBc758aBF8A3C49a5931383bB66a5B5dea4a919",
            borrowerNonce: 1,
            nftCollateralAddress: "0x0c35e6F690EC8cF99c4509a2055066dEb043DF96",
            nftTokenId: 1,
            loanTokenAddress: "0x913efbB29E9C2E3045A082D39B36896D82268977",
            loanAmount: ethers.parseEther("100"),
            interestFee: ethers.parseEther("25"),
            loanDuration: 360000,
            borrowerSignature:
                "0xd7972e9afb7fcab65d9a7fa6879a9d9842918163f0039b1060c5dd53382cb4a00389dbc217071ce9b24e975a48fb497fdfe2e7bb9a3c302ca10425a6c7f700ca1b",
        };

        setNfts(nft);
    }

    async function fetchData() {
        await addNft();
    }

    useEffect(() => {
        getNftPicture("0x0c35e6F690EC8cF99c4509a2055066dEb043DF96", 0);
    }, []);

    return (
        <Table aria-label="NFT Details">
            <TableHeader
                columns={[
                    { uid: "nftPicture", name: "NFT Picture" },
                    { uid: "borrowerAddress", name: "Borrower Address" },
                    { uid: "nftTokenId", name: "NFT Token ID" },
                    { uid: "loanAmount", name: "Amount" },
                    { uid: "interestFee", name: "Interest Fee" },
                    { uid: "loanDuration", name: "Duration" },
                    { uid: "lendedButton", name: "Lending" },
                ]}
            >
                {(column) => (
                    <TableColumn key={column.uid} align="start">
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody>
                {nftData.map((nft, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            <Image
                                src={nftPicture}
                                alt="NFT"
                                style={{ objectFit: "cover" }}
                                width={100}
                                height={100}
                            />
                        </TableCell>
                        <TableCell>{`${nft.borrowerAddress.slice(0, 6)}...${nft.borrowerAddress.slice(-4)}`}</TableCell>
                        {/* shorten address */}
                        <TableCell>{nft.nftTokenId}</TableCell>
                        <TableCell>
                            {ethers.formatEther(nft.loanAmount)} ETH
                        </TableCell>
                        <TableCell>
                            {ethers.formatEther(nft.interestFee)} ETH
                        </TableCell>
                        <TableCell>{nft.loanDuration / 3600} hours</TableCell>
                        <TableCell>
                            <Button onPress={handleOnPress}>Lend</Button>
                            <UIModal
                                isOpen={isOpen}
                                onOpenChange={onOpenChange}
                                picture={nftPicture}
                                currentNft={nft}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default NftTable;
