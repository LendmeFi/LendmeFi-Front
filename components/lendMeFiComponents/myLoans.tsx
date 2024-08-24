"use client";

import React, { useState, useEffect } from "react";
import { Eip1193Provider, ethers } from "ethers";
import { CircularProgress, Image, useDisclosure } from "@nextui-org/react";
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


const myLoans: React.FC = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [loanBorrowerData, setLoanBorrowerData] = useState<loansDetails[]>([]);
    const [loanLenderData, setLoanLenderData] = useState<loansDetails[]>([]);
    const { walletProvider } = useWeb3ModalProvider()
    const wProvider = new BrowserProvider(walletProvider as Eip1193Provider);
    const [loading, setLoading] = useState(true);  // Loading state
    const [hasLoan, setHasLoan] = useState(false);
    const [borrowerNftPicture, setBorrowerNftPicture] = useState<string[]>([]);
    const [lenderNftPicture, setLenderNftPicture] = useState<string[]>([]);

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
            console.log("ASFFFFFFFFFFFFF", loan.borrowerAddress.toString());
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

    if (!hasLoan) {
        return (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                You don't have any Loans.
            </div>
        );
    }
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa", hasLoan);
    console.log("Borrower Loans: ", loanBorrowerData);
    console.log("Lender Loans: ", loanLenderData);

    return (
        <div>
            {loanBorrowerData.length > 0 && (
                <div style={{ marginBottom: "40px" }}>
                    <h3>Your Borrower Loans</h3>
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
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
            {loanLenderData.length > 0 && (
                <div>
                    <h3>Your Lender Loans</h3>
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
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
};

export default myLoans;