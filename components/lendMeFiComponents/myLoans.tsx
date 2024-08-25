"use client";

import React, { useState, useEffect } from "react";
import { Eip1193Provider, ethers } from "ethers";
import { Button, Card, CircularProgress, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from "@nextui-org/react";
import nftAbi from "@/context/ContractAbi";
import Contract_Function_Abi from '@/context/ContractFunctionAbi';
import UIModal from "../uiComponent/Modal";
import { on } from "events";
import { nftData, loansDetails } from "@/types/lendingDetails";
import { BrowserProvider } from 'ethers'
import { useWeb3ModalProvider } from '@web3modal/ethers/react'

interface ToastProps {
    message: string;
    onClose: () => void;
}

const myLoans: React.FC = () => {
    const [loanBorrowerData, setLoanBorrowerData] = useState<loansDetails[]>([]);
    const [loanLenderData, setLoanLenderData] = useState<loansDetails[]>([]);
    const { walletProvider } = useWeb3ModalProvider()
    const wProvider = new BrowserProvider(walletProvider as Eip1193Provider);
    const [loading, setLoading] = useState(true);  // Loading state
    const [hasLoan, setHasLoan] = useState(false);
    const [borrowerNftPicture, setBorrowerNftPicture] = useState<string[]>([]);
    const [lenderNftPicture, setLenderNftPicture] = useState<string[]>([]);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedNft, setSelectedNft] = useState<loansDetails | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
        return (
            <Card
                style={{
                    position: "fixed",
                    top: "20px",
                    right: "20px",
                    zIndex: 1000,
                    backgroundColor: "#1e1e1e",
                    color: "#ffffff",
                    padding: "16px",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                }}
            >
                <p>{message}</p>
                <Button color="warning" onClick={onClose}>
                    Close
                </Button>
            </Card>
        );
    };
    const handleShowToast = () => {
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 3000); // 3 saniye sonra bildirimi kapat
    };


    const ethersProvider = new ethers.JsonRpcProvider(
        "https://sepolia-rpc.scroll.io/",
    );

    const convertIpfsUriToUrl = (uri: string) => {
        if (uri.startsWith("ipfs://")) {
            console.log(`Converting IPFS URI to URL: ${uri}`);
            return `https://ipfs.io/ipfs/${uri.substring(7)}.png`;
        }
        return `${uri}.png`;
    };

    const lendmeFiContractAddress = "0x201c11d25F3590De65DD72177D1f4AD364da1d3e";

    let lendmeFiContract = new ethers.Contract(
        lendmeFiContractAddress,
        Contract_Function_Abi,
        wProvider,
    );


    const getNftPicture = async (contractAddress: string, tokenId: number) => {
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

    const getLoans = async () => {
        const signer = await wProvider.getSigner();
        const userAddress = await signer.getAddress();
        let numberOfLoans = await lendmeFiContract.numberofTotalLoans();

        let borrowerLoansTemp: loansDetails[] = [];
        let lenderLoansTemp: loansDetails[] = [];

        console.log(userAddress);


        for (let i = 0; i < numberOfLoans; i++) {
            let loan: loansDetails = await lendmeFiContract.loans(i);
            if (loan.borrowerAddress.toString() === userAddress.toString()) {
                borrowerLoansTemp.push(loan);
            }
            if (loan.lenderAddress.toString() === userAddress.toString()) {
                lenderLoansTemp.push(loan);
            }
        }
        console.log("Borrower Loans: ", borrowerLoansTemp);
        console.log("Lender Loans: ", lenderLoansTemp);

        setLoanBorrowerData(borrowerLoansTemp);
        setLoanLenderData(lenderLoansTemp);
        console.log("Lendeeeeeerrrrrrrrrr Loans: ", loanBorrowerData);

        console.log(hasLoan);
        setHasLoan(borrowerLoansTemp.length > 0 || lenderLoansTemp.length > 0);
        console.log(hasLoan);
        if (borrowerLoansTemp.length > 0) {
            const pictures = await Promise.all(
                borrowerLoansTemp.map(async (loan) => {
                    return await getNftPicture(loan.nftCollateralAddress, loan.nftTokenId);
                })
            );
            setBorrowerNftPicture(pictures);
        }

        if (lenderLoansTemp.length > 0) {
            const pictures = await Promise.all(
                lenderLoansTemp.map(async (loan) => {
                    return await getNftPicture(loan.nftCollateralAddress, loan.nftTokenId);
                })
            );
            setLenderNftPicture(pictures);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getLoans();
            } catch (error: any) {
                console.error("Error fetching loans:", error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    interface Props {
        isOpen: boolean;
        onOpenChange: () => void;
        picture: string[];
        currentNft: loansDetails | null;
    }

    const UIModal = ({ isOpen, onOpenChange, currentNft, picture }: Props) => {
        if (!currentNft) return null;
        console.log("currentNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaft");
        const [nftName, setNftName] = useState<string>("");
        const [loanStatusById, setLoanStatusById] = useState(0);
        const [userAddress, setUserAddress] = useState<string>("");

        useEffect(() => {
            const fetchSignerAndAddress = async () => {
                const signer = await wProvider.getSigner();
                const userAddress = await signer.getAddress();
                setUserAddress(userAddress);
                const lendmeFiContractAddress = "0x201c11d25F3590De65DD72177D1f4AD364da1d3e";
                const lendmeFiContract = new ethers.Contract(
                    lendmeFiContractAddress,
                    Contract_Function_Abi,
                    wProvider,
                );

                fetchNftName(currentNft);
                const loanStatusById = await lendmeFiContract.loanStatus(currentNft.loanId);
                setLoanStatusById(loanStatusById);
            };

            fetchSignerAndAddress();
        }, [currentNft]);

        enum loanStatus {
            ACTIVE,
            REPAID,
            LIQUIDATED,
        }

        async function fetchNftName(currentNft?: loansDetails) {
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

        }, [currentNft]);

        const sumbitTx = async () => {
            if (currentNft.borrowerAddress.toString() === userAddress.toString()) {
                const repayment = async () => {
                    const tx = await lendmeFiContract.repayLoan(currentNft.loanId);
                    await tx.wait();
                    setShowToast(true);
                    handleShowToast();
                };
                repayment();
            }

            if (currentNft.lenderAddress.toString() === userAddress.toString()) {
                const liquidate = async () => {
                    const tx = await lendmeFiContract.liquidateLoan(currentNft.loanId);
                    await tx.wait();
                    setShowToast(true);
                    handleShowToast();
                };
                liquidate();
            }
        }

        function handleSubmit(): void {
            sumbitTx();
        }

        return (
            <>
                <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
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
                                                src={picture[currentNft.nftTokenId]}
                                                alt="NFT"
                                                style={{ objectFit: "cover" }}
                                                width={150}
                                                height={150}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <h3>Loan Details</h3>
                                        <p>Loan ID: {currentNft.loanId}</p>
                                        <p>Collateral Address: {currentNft.nftCollateralAddress}</p>
                                        <p>Token ID: {currentNft.nftTokenId}</p>
                                        <p>Loan Amount: {ethers.formatEther(currentNft.loanAmount)} ETH</p>
                                        <p>Interest Fee: {ethers.formatEther(currentNft.interestFee)} ETH</p>
                                        <p>Loan Start Time: {new Date(Number(currentNft.loanStartTime) * 1000).toLocaleString()}</p>
                                        <p>Loan Duration: {currentNft.loanDuration.toString()} seconds</p>
                                        <p>Loan Status: {loanStatus[loanStatusById]}</p>
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
                                    <Button onClick={handleSubmit} color="primary"></Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </>
        );
    };

    const handleOnPress = (nft: loansDetails) => {
        setSelectedNft(nft);
        onOpen();
    };


    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "25vh" }}>
                <CircularProgress />
            </div>
        );
    }

    if (!hasLoan) {
        return (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                You don't have any Loans.
            </div>
        );
    }


    return (
        <div>

            {loanBorrowerData.length > 0 && (
                <div style={{ marginBottom: "40px" }}>
                    <h3>Your Borrower Loans</h3>
                    <>
                        <Table aria-label="Borrower Loans">
                            <TableHeader>
                                <TableColumn>Loan ID</TableColumn>
                                <TableColumn>NFT Picture</TableColumn>
                                <TableColumn>Collateral Address</TableColumn>
                                <TableColumn>Token ID</TableColumn>
                                <TableColumn>Loan Amount</TableColumn>
                                <TableColumn>Interest Fee</TableColumn>
                                <TableColumn>Loan Start Time</TableColumn>
                                <TableColumn>Loan Duration</TableColumn>
                                <TableColumn>Action</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {loanBorrowerData.map((loan, index) => (

                                    <TableRow key={loan.loanId.toString()}>
                                        <TableCell>{loan.loanId.toString()}</TableCell>
                                        <TableCell>
                                            <Image
                                                src={borrowerNftPicture[index]}
                                                alt="NFT"
                                                width={100}
                                                height={100}
                                            />
                                        </TableCell>
                                        <TableCell>{loan.nftCollateralAddress}</TableCell>
                                        <TableCell>{loan.nftTokenId.toString()}</TableCell>
                                        <TableCell>{ethers.formatEther(loan.loanAmount)} ETH</TableCell>
                                        <TableCell>{ethers.formatEther(loan.interestFee)} ETH</TableCell>
                                        <TableCell>{new Date(Number(loan.loanStartTime) * 1000).toLocaleString()}</TableCell>
                                        <TableCell>{loan.loanDuration.toString()} seconds</TableCell>
                                        <TableCell>
                                            <Button onPress={() => handleOnPress(loan)}>View</Button>
                                        </TableCell>
                                    </TableRow>

                                ))}
                            </TableBody>
                        </Table>
                        <UIModal
                            isOpen={isOpen}
                            onOpenChange={onOpenChange}
                            currentNft={selectedNft as loansDetails}
                            picture={borrowerNftPicture}
                        />
                        {showToast && (
                            <Toast message={toastMessage} onClose={() => setShowToast(false)} />
                        )}
                    </>
                </div>
            )}
            {loanLenderData.length > 0 && (
                <div>
                    <h3>Your Lender Loans</h3>
                    <>
                        <Table aria-label="Lender Loans">
                            <TableHeader>
                                <TableColumn>Loan ID</TableColumn>
                                <TableColumn>NFT Picture</TableColumn>
                                <TableColumn>Collateral Address</TableColumn>
                                <TableColumn>Token ID</TableColumn>
                                <TableColumn>Loan Amount</TableColumn>
                                <TableColumn>Interest Fee</TableColumn>
                                <TableColumn>Loan Start Time</TableColumn>
                                <TableColumn>Loan Duration</TableColumn>
                                <TableColumn>Action</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {loanLenderData.map((loan, index) => (

                                    <TableRow key={loan.loanId.toString()}>
                                        <TableCell>{loan.loanId.toString()}</TableCell>
                                        <TableCell>
                                            <Image
                                                src={lenderNftPicture[index]}
                                                alt="NFT"
                                                width={100}
                                                height={100}
                                            />
                                        </TableCell>
                                        <TableCell>{loan.nftCollateralAddress}</TableCell>
                                        <TableCell>{loan.nftTokenId}</TableCell>
                                        <TableCell>{ethers.formatEther(loan.loanAmount)} ETH</TableCell>
                                        <TableCell>{ethers.formatEther(loan.interestFee)} ETH</TableCell>
                                        <TableCell>{new Date(Number(loan.loanStartTime) * 1000).toLocaleString()}</TableCell>
                                        <TableCell>{loan.loanDuration.toString()} seconds</TableCell>
                                        <TableCell>
                                            <Button onPress={() => handleOnPress(loan)}>View</Button>
                                        </TableCell>
                                    </TableRow>

                                ))}
                            </TableBody >
                        </Table>
                        <UIModal
                            isOpen={isOpen}
                            onOpenChange={onOpenChange}
                            currentNft={selectedNft as loansDetails}
                            picture={lenderNftPicture}
                        />
                        {showToast && (
                            <Toast message={toastMessage} onClose={() => setShowToast(false)} />
                        )}
                    </>
                </div >
            )
            }

        </div >
    );
};

export default myLoans;