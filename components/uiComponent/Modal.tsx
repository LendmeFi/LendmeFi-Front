import React, { use, useEffect, useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Image,
} from "@nextui-org/react";
import { ListingDetails } from "@/types/lendingDetails";
import { ethers } from "ethers";
import nftAbi from "@/context/ContractAbi";

interface Props {
    isOpen: boolean;
    onOpenChange: () => void;
    picture: string[];
    currentNft: ListingDetails;
}

const UIModal = ({ isOpen, onOpenChange, currentNft, picture }: Props) => {
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
                                {currentNft.nftTokenId}
                            </ModalHeader>
                            <ModalBody>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Image
                                            src={picture[currentNft.nftTokenId]}
                                            alt="NFT"
                                            style={{ objectFit: "cover" }}
                                            width={100}
                                            height={100}
                                        />
                                    </div>
                                    <div>
                                        <p>Name: {nftName}</p>
                                        <p>ID: {currentNft.nftTokenId}</p>

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
