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
import { nftData } from "@/types/lendingDetails";
import { BrowserProvider } from 'ethers'
import { useWeb3ModalProvider } from '@web3modal/ethers/react'


const myNfts: React.FC = () => {
    const [nftPicture, setNftPicture] = useState<string[]>([]);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [NftData, setNftData] = useState<nftData[]>([]);
    const { walletProvider } = useWeb3ModalProvider()
    const wProvider = new BrowserProvider(walletProvider as Eip1193Provider);
    const [loading, setLoading] = useState(true);  // Loading state
    const [hasNfts, setHasNfts] = useState(false);

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

    async function findOwnedNfts() {
        const signer = await wProvider.getSigner();
        const userAddress = await signer.getAddress();
        console.log(`User address: ${userAddress}`);
        var balance = await nftContract.balanceOf(userAddress);
        console.log(`Total NFTs owned: ${balance.toString()}`);
        console.log(`User address: ${userAddress.toString()}`);

        const ownedTokenIds = [];

        // Örnek tarama yöntemi: tokenId'leri 1'den 100'e kadar tarar.
        // Gerçek dünyada, kontrattaki tokenId aralığını bilmek faydalı olur.
        for (let i = 0; i <= 100; i++) {
            try {
                const owner = await nftContract.ownerOf(i) as string;
                console.log(`Owner of tokenId ${i}: ${owner}`);
                if (owner === userAddress.toString() && balance > 0) {
                    ownedTokenIds.push(i);
                    balance--;
                }
            } catch (err) {
                if ((err as Error).message.includes("ERC721: owner query for nonexistent token")) {
                    console.log(`Token ID ${i} does not exist.`);
                    continue;
                }
                continue;
            }
        }
        console.log(`Owned Token IDs: ${ownedTokenIds}`);
        return ownedTokenIds;
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
            console.log("uridata: ", data);
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
            try {
                const nftIds = await findOwnedNfts();
                console.log("nftIds: ", nftIds);
                if (nftIds.length > 0) {
                    setHasNfts(true);
                    const pictures = await Promise.all(
                        nftIds.map(async (number) => {
                            return await getNftPicture(nftCollateralAddress1, number);
                        })
                    );
                    setNftPicture(pictures);
                    const name = await nftContract.name();
                    const symbol = await nftContract.symbol();
                    const data = nftIds.map((id, index) => {
                        return {
                            nftCollateralAddress: nftCollateralAddress1,
                            nftTokenId: id,
                            nftName: name,
                            nftSymbol: symbol,
                            nftPicture: pictures[index],
                        };
                    });
                    setNftData(data);
                }
            } catch (error: any) {
                console.error("Error fetching data or pictures: ", error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchDataAndPictures();
    }, []);

    function handleOnPress(nft: nftData): void {
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
                <title >
                    You don't have any NFTs for listing.
                </title>
            </div>
        );
    }

    return (
        <Table aria-label="NFT Details">
            <TableHeader
                columns={[
                    { uid: "nftPicture", name: "NFT Picture" },
                    { uid: "nftName", name: "NFT Name" },
                    { uid: "nftSymbol", name: "NFT Symbol" },
                    { uid: "nftCollateralAddress", name: "NFT Contract Address" },
                    { uid: "nftTokenId", name: "NFT Token ID" },
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
                {NftData.map((nft, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            <Image
                                src={nft.nftPicture}
                                alt="NFT"
                                style={{ objectFit: "cover" }}
                                width={100}
                                height={100}
                            />
                        </TableCell>
                        <TableCell>{nft.nftName}</TableCell>
                        <TableCell>{nft.nftSymbol}</TableCell>
                        <TableCell>{`${nft.nftCollateralAddress.slice(0, 6)}...${nft.nftCollateralAddress.slice(-4)}`}</TableCell>
                        <TableCell>{nft.nftTokenId}</TableCell>
                        <TableCell>
                            <Button onPress={() => handleOnPress(nft)}>List it</Button>
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
        </Table>
    );
};

export default myNfts;