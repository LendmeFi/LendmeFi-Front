"use client";

import React, { useState, useEffect } from "react";
import { Contract, Eip1193Provider, ethers } from "ethers";
import { Button, CircularProgress, Image, useDisclosure } from "@nextui-org/react";
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
import { ListingDetails, nftData } from "@/types/lendingDetails";
import { BrowserProvider } from 'ethers'
import { useWeb3ModalProvider } from '@web3modal/ethers/react'
import { getNftListingsByAddress } from "@/app/firebaseService";


const myList: React.FC = () => {
    const [nftPicture, setNftPicture] = useState<string[]>([]);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { walletProvider } = useWeb3ModalProvider()
    const wProvider = new BrowserProvider(walletProvider as Eip1193Provider);
    const [loading, setLoading] = useState(true);  // Loading state
    const [hasNfts, setHasNfts] = useState(false);
    const [listingData, setListingData] = useState<ListingDetails[]>([]);

    const nftCollateralAddress1 = "0x0c35e6F690EC8cF99c4509a2055066dEb043DF96";
    const ethersProvider = new ethers.JsonRpcProvider(
        "https://sepolia-rpc.scroll.io/",
    );
    let nftContract = new ethers.Contract(
        nftCollateralAddress1,
        nftAbi,
        ethersProvider,
    );

    const convertIpfsUriToUrl = (uri: string) => {
        if (uri.startsWith("ipfs://")) {
            console.log(`Converting IPFS URI to URL: ${uri}`);
            return `https://ipfs.io/ipfs/${uri.substring(7)}.png`;
        }
        return `${uri}.png`;
    };

    async function listDataByAddress() {
        const signer = await wProvider.getSigner();
        const userAddress = await signer.getAddress();
        const listData: ListingDetails[] = await getNftListingsByAddress(userAddress);
        return listData;
    }

    const getNftPicture = async (contractAddress: string, tokenId: number) => {
        const ethersProvider = new ethers.JsonRpcProvider(
            "https://sepolia-rpc.scroll.io/",
        );
        let nftContract = new ethers.Contract(
            contractAddress,
            nftAbi,
            ethersProvider,
        );

        try {
            let data = await nftContract.tokenURI(tokenId);
            let url = convertIpfsUriToUrl(data);
            return url;
        } catch (error: any) {
            console.log(error.message);
            return "hataaaaaaaaa";
        }
        // let url = `https://ipfs.io/ipfs/${contractAddress}/${tokenId}.png`;
        // await setNftPicture(url);
    };

    useEffect(() => {
        const fetchDataAndPictures = async () => {
            const data = await listDataByAddress();
            setListingData(data);
            if (data.length > 0) {
                setHasNfts(true);
            }
            try {
                const pictures = await Promise.all(
                    data.map((nft) => {
                        return getNftPicture(nft.nftCollateralAddress, nft.nftTokenId);
                    }));
                setNftPicture(pictures);
            } catch (error: any) {
                console.error("Error fetching data or pictures: ", error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchDataAndPictures();
    }, []);

    function handleOnPress(nft: ListingDetails): void {
        throw new Error("Function not implemented.");
    }

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "25vh" }}>
                <CircularProgress />
            </div>
        );
    }

    if (!hasNfts) {
        return (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                You don't have any NFTs for listing.
            </div>
        );
    }

    return (
        <Table aria-label="NFT List Details">
            <TableHeader
                columns={[
                    { uid: "nftPicture", name: "NFT Picture" },
                    { uid: "nftCollateralAddress", name: "NFT Contract Address" },
                    { uid: "nftTokenId", name: "NFT Token ID" },
                    { uid: "loanAmount", name: "Loan Amount" },
                    { uid: "interestFee", name: "Interest Fee" },
                    { uid: "loanDuration", name: "Loan Duration" },
                    { uid: "actions", name: "Actions" },
                ]}
            >
                {(column) => (
                    <TableColumn key={column.uid} align="start">
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody>
                {listingData.map((nft, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            <Image
                                src={nftPicture[index]}
                                alt="NFT"
                                style={{ objectFit: "cover" }}
                                width={100}
                                height={100}
                            />
                        </TableCell>
                        <TableCell>{`${nft.nftCollateralAddress.slice(0, 6)}...${nft.nftCollateralAddress.slice(-4)}`}</TableCell>
                        <TableCell>{nft.nftTokenId}</TableCell>
                        <TableCell>{nft.loanAmount} ETH</TableCell>
                        <TableCell> {nft.interestFee} ETH</TableCell>
                        <TableCell>{nft.loanDuration / 3600} hours</TableCell>
                        <TableCell><Button onPress={() => handleOnPress(nft)}>Cancel it</Button>
                            {/* <UIModal
                                key={index}
                                isOpen={isOpen}
                                onOpenChange={onOpenChange}
                                picture={nftPicture[index]}
                                currentNft={selectedNft as ListingDetails}
                            /> */}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table >
    );
};

export default myList;