"use client";
import React, { useEffect, useState } from "react";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { Card, CardBody, Tab, Tabs, Progress } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import MyNFTs from "@/components/lendmeFiComponents/myNfts";
import MyLoans from "@/components/lendmeFiComponents/myLoans";
import MyList from "@/components/lendmeFiComponents/myList";
import MyOffers from "@/components/lendmeFiComponents/myOffers";

const Profile: React.FC = () => {
    const { address, isConnected } = useWeb3ModalAccount();
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isConnected) {
                router.push("/");
            } else {
                setLoading(false);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [isConnected, router]);

    if (loading) {
        return (
            <section className="flex flex-col items-center justify-center py-12 md:py-16 px-4 md:px-8 lg:px-16 text-white">
                <Progress isIndeterminate size="sm" />
            </section>
        );
    }

    return (
        <section className="flex flex-col items-center justify-center py-12 md:py-16 text-white">
            <div className="w-full max-w-6xl xl:max-w-full">
                <Tabs aria-label="Profile Sections" className="w-full text-white">
                    <Tab key="myNfts" title="My NFTs" className="text-lg font-semibold">
                        <Card className="p-4 rounded-lg text-white">
                            <CardBody>
                                <MyNFTs />
                            </CardBody>
                        </Card>
                    </Tab>
                    <Tab key="myLoans" title="My Loans" className="text-lg font-semibold">
                        <Card className="p-4 rounded-lg text-white">
                            <CardBody>
                                <MyLoans />
                            </CardBody>
                        </Card>
                    </Tab>
                    <Tab key="myList" title="My List" className="text-lg font-semibold">
                        <Card className="p-4 rounded-lg text-white">
                            <CardBody>
                                <MyList />
                            </CardBody>
                        </Card>
                    </Tab>
                    <Tab key="myOffers" title="My Offers" className="text-lg font-semibold">
                        <Card className="p-4 rounded-lg text-white">
                            <CardBody>
                                <MyOffers />
                            </CardBody>
                        </Card>
                    </Tab>
                </Tabs>
            </div>
        </section>
    );
};

export default Profile;
