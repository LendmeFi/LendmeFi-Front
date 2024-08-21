import React from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Image,
} from "@nextui-org/react";
import { ListingDetails } from "@/types/ListingDetails";

interface Props {
    isOpen: boolean;
    onOpenChange: () => void;
    picture: string;
    currentNft: ListingDetails;
}

const UIModal = ({ isOpen, onOpenChange, picture, currentNft }: Props) => {
    console.log("currentNft", currentNft);
    return (
        <>
            <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Modal Title
                            </ModalHeader>
                            <ModalBody>
                                <Image
                                    src={picture}
                                    alt="NFT"
                                    style={{ objectFit: "cover" }}
                                    width={100}
                                    height={100}
                                />
                                <p>{currentNft.borrowerAddress}</p>
                                <p>{currentNft.nftTokenId}</p>
                                <p>{currentNft.loanTokenAddress}</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default UIModal;
