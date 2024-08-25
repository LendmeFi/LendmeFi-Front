"use client";

import React, { useState, useEffect } from "react";
import { Contract, Eip1193Provider, ethers } from "ethers";
import {
    Button,
    CircularProgress,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react";
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
import { BrowserProvider } from "ethers";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { addNftListing, getBorrowerNonce } from "@/app/firebaseService";

const myNfts: React.FC = () => {
    const [nftPicture, setNftPicture] = useState<string[]>([]);
    const [NftData, setNftData] = useState<nftData[]>([]);
    const { walletProvider } = useWeb3ModalProvider();
    const wProvider = new BrowserProvider(walletProvider as Eip1193Provider);
    const [loading, setLoading] = useState(true); // Loading state
    const [hasNfts, setHasNfts] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedNft, setSelectedNft] = useState<nftData | null>(null);

    const nftCollateralAddress1 = "0x0c35e6F690EC8cF99c4509a2055066dEb043DF96";
    const loanTokenAddress1 = "0x913efbB29E9C2E3045A082D39B36896D82268977";
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
                const owner = (await nftContract.ownerOf(i)) as string;
                console.log(`Owner of tokenId ${i}: ${owner}`);
                if (owner === userAddress.toString() && balance > 0) {
                    ownedTokenIds.push(i);
                    balance--;
                }
            } catch (err) {
                if (
                    (err as Error).message.includes(
                        "ERC721: owner query for nonexistent token",
                    )
                ) {
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
                            return await getNftPicture(
                                nftCollateralAddress1,
                                number,
                            );
                        }),
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
                console.error(
                    "Error fetching data or pictures: ",
                    error.message,
                );
            } finally {
                setLoading(false);
            }
        };
        fetchDataAndPictures();
    }, []);

    interface Props {
        isOpen: boolean;
        onOpenChange: () => void;
        picture: string[];
        currentNft: nftData;
    }

    const UIModal = ({ isOpen, onOpenChange, currentNft, picture }: Props) => {
        const [nftName, setNftName] = useState<string>("");
        const [loanAmount, setLoanAmount] = useState("");
        const [interestFee, setInterestFee] = useState("");
        const [loanDuration, setLoanDuration] = useState("");

        const domain = {
            name: "LendmeFi",
            version: "1",
            chainId: 534351, // Scroll Sepolia chain id
            verifyingContract: "0x201c11d25F3590De65DD72177D1f4AD364da1d3e", // be careful with verifyingContract is must be the main contract address.
        };

        const types = {
            BorrowerData: [
                { name: "borrowerAddress", type: "address" },
                { name: "borrowerNonce", type: "uint256" },
                { name: "nftCollateralAddress", type: "address" },
                { name: "nftTokenId", type: "uint256" },
                { name: "loanTokenAddress", type: "address" },
                { name: "loanAmount", type: "uint256" },
                { name: "interestFee", type: "uint256" },
                { name: "loanDuration", type: "uint256" },
            ],
        };

        const handleSubmit = async (event: React.FormEvent) => {
            event.preventDefault();
            const signer = await wProvider.getSigner();

            const userAddress = await signer.getAddress();
            const userNonce = await getBorrowerNonce(userAddress);

            console.log("user noncceeee:", userNonce);

            // Borrower data
            const borrowerData = {
                borrowerAddress: userAddress,
                borrowerNonce: userNonce,
                nftCollateralAddress: currentNft.nftCollateralAddress,
                nftTokenId: currentNft.nftTokenId,
                loanTokenAddress: loanTokenAddress1,
                loanAmount: loanAmount,
                interestFee: interestFee,
                loanDuration: loanDuration,
            };

            const signature = await signer.signTypedData(
                domain,
                types,
                borrowerData,
            );

            const listData: ListingDetails = {
                borrowerAddress: userAddress,
                borrowerNonce: userNonce as number,
                borrowerSignature: signature,
                interestFee: Number(interestFee),
                loanAmount: Number(loanAmount),
                loanDuration: Number(loanDuration),
                loanTokenAddress: loanTokenAddress1,
                nftCollateralAddress: currentNft.nftCollateralAddress,
                nftTokenId: currentNft.nftTokenId,
            };
            const submitListing = await addNftListing(userAddress, listData);
            if (submitListing) {
                console.log("Listed successfully");
                console.log("sign: ", signature);
                alert("Listed successfully");
            } else {
                alert("Error listing");
                console.log("Error listing");
            }
            isOpen = false;
        };

        async function fetchNftName(currentNft?: nftData) {
            if (!currentNft) return;
            const ethersProvider = new ethers.JsonRpcProvider(
                "https://sepolia-rpc.scroll.io/",
            );
            let nftContract = new ethers.Contract(
                currentNft.nftCollateralAddress,
                nftAbi,
                ethersProvider,
            );
            let nftName = await nftContract.name();
            setNftName(nftName);
            console.log("nftName", nftName);
        }
        useEffect(() => {
            fetchNftName(currentNft);
        }, [currentNft]);
        return (
            <>
                <Modal
                    backdrop="blur"
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">
                                    {nftName}
                                </ModalHeader>
                                <ModalBody>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Image
                                                src={
                                                    picture[
                                                    currentNft.nftTokenId
                                                    ]
                                                }
                                                alt="NFT"
                                                style={{ objectFit: "cover" }}
                                                width={150}
                                                height={150}
                                            />
                                        </div>
                                        <div>
                                            <form onSubmit={handleSubmit}>
                                                <div>
                                                    {/* <input
                                                            type="text"
                                                            value={loanAmount}
                                                            onChange={(e) => setLoanAmount(e.target.value)}
                                                        /> */}
                                                    <Input
                                                        key="1"
                                                        type="text"
                                                        variant="bordered"
                                                        value={loanAmount}
                                                        label="Amount"
                                                        className="max-w-[220px]"
                                                        onChange={(e) =>
                                                            setLoanAmount(
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div>
                                                    <Input
                                                        key="2"
                                                        type="text"
                                                        variant="bordered"
                                                        value={interestFee}
                                                        label="Fee"
                                                        className="max-w-[220px]"
                                                        onChange={(e) =>
                                                            setInterestFee(
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div>
                                                    <Input
                                                        key="3"
                                                        type="text"
                                                        variant="bordered"
                                                        value={loanDuration}
                                                        label="Duration"
                                                        className="max-w-[220px]"
                                                        onChange={(e) =>
                                                            setLoanDuration(
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        color="danger"
                                        variant="light"
                                        onPress={onClose}
                                    >
                                        Close
                                    </Button>
                                    <Button
                                        onClick={handleSubmit}
                                        color="primary"
                                    >
                                        Submit
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </>
        );
    };

    const handleOnPress = (nft: nftData) => {
        setSelectedNft(nft);
        onOpen();
    };

    if (loading) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "25vh",
                }}
            >
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
        <>
            <Table aria-label="NFT Details">
                <TableHeader
                    columns={[
                        { uid: "nftPicture", name: "NFT Picture" },
                        { uid: "nftName", name: "NFT Name" },
                        { uid: "nftSymbol", name: "NFT Symbol" },
                        {
                            uid: "nftCollateralAddress",
                            name: "NFT Contract Address",
                        },
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
                                <Button onPress={() => handleOnPress(nft)}>
                                    List it
                                </Button>
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
            <UIModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                currentNft={selectedNft as nftData}
                picture={nftPicture}
            />
        </>
    );
};

export default myNfts;
