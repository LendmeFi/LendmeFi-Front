import React, { useEffect, useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Image,
    Table,
    TableColumn,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
} from "@nextui-org/react";
import { ListingDetails } from "@/types/lendingDetails";
import { BrowserProvider, Eip1193Provider, ethers } from "ethers";
import nftAbi from "@/context/ContractAbi";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import Contract_Function_Abi from "@/context/ContractFunctionAbi";
import { get } from "http";
import { getLenderNonce, getNftListingsByAddress } from "@/app/firebaseService";

interface ModalProps {
    children: React.ReactNode;
    backdrop: 'blur';
    isOpen: boolean;
    onOpenChange: () => void;
}

interface Props {
    isOpen: boolean;
    onOpenChange: () => void;
    currentNft: ListingDetails;
    picture: string[];
}

const MyModal: React.FC<ModalProps> = ({ children, backdrop, isOpen, onOpenChange }) => {
    const modalStyles = {
        width: '80%', // Change the width here
        maxWidth: '500px',
    };

    return (
        <Modal backdrop={backdrop} isOpen={isOpen} onOpenChange={onOpenChange} style={modalStyles}>
            {children}
        </Modal>
    );
};

const UIModal: React.FC<Props> = ({ isOpen, onOpenChange, currentNft, picture }) => {
    const [nftName, setNftName] = useState<string>("");
    const lendmeFiContractAddress = "0x201c11d25F3590De65DD72177D1f4AD364da1d3e";

    async function fetchNftName(currentNft?: ListingDetails) {
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


    const handleLendSubmit = async () => {
        const { walletProvider } = useWeb3ModalProvider()
        const wProvider = new BrowserProvider(walletProvider as Eip1193Provider);
        const signer = await wProvider.getSigner();
        if (!signer) return;
        const userAddress = await signer.getAddress();
        let lendmeFiContractSigner = new ethers.Contract(
            lendmeFiContractAddress,
            Contract_Function_Abi,
            signer,
        );
        const listData: ListingDetails[] = await getNftListingsByAddress(userAddress);
        const lenderNonce = await getLenderNonce(userAddress);
        for (let i = 0; i < listData.length; i++) {
            if (listData[i].nftTokenId === currentNft.nftTokenId) {
                let tx = await lendmeFiContractSigner.startLoanDirectly(
                    listData[i].borrowerAddress,
                    listData[i].borrowerNonce,
                    lenderNonce,
                    listData[i].nftCollateralAddress,
                    listData[i].nftTokenId,
                    listData[i].loanTokenAddress,
                    listData[i].loanAmount,
                    listData[i].interestFee,
                    listData[i].loanDuration,
                    listData[i].borrowerSignature,
                );
                await tx.wait();
                alert(`Lend Successfully, ${tx.hash}`);
            }
        }

    }

    return (
        <>
            <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange} size='3xl'>
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
                                    <div>
                                        <p>Name: {nftName}</p>
                                        <p>ID: {currentNft.nftTokenId}</p>
                                        <p>Amount: {currentNft.loanAmount}</p>
                                        <p>Fee: {currentNft.interestFee}</p>
                                        <p>
                                            Duration: {currentNft.loanDuration}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-center">Offers</p>
                                <Table aria-label="Example static collection table">
                                    <TableHeader>
                                        <TableColumn>OFFERER ADDRESS</TableColumn>
                                        <TableColumn>OFFER AMOUNT</TableColumn>
                                        <TableColumn>OFFER INTEREST FEE</TableColumn>
                                        <TableColumn>OFFER DURATION TIME</TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow key="1">
                                            <TableCell>LendmeFi-1</TableCell>
                                            <TableCell>1 ETH</TableCell>
                                            <TableCell>0.5 ETH</TableCell>
                                            <TableCell>1 month</TableCell>
                                            {/* <TableCell>
                                                <Button color="success" size="sm">
                                                    ACCEPT IT
                                                </Button>{" "}
                                            {/* <TableCell>
                                                <Button color="success" size="sm">
                                                    ACCEPT IT
                                                </Button>{" "}
                                            </TableCell> */}
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                                <Button color="primary">Offer</Button>
                                <Button onClick={handleLendSubmit} color="primary">Lend</Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default UIModal;