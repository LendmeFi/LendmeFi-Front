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
import { ethers } from "ethers";
import nftAbi from "@/context/ContractAbi";

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
                                <Button color="primary">Lend</Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default UIModal;