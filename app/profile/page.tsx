
"use client";
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useWeb3ModalAccount } from '@web3modal/ethers/react'
import { Card, CardBody, Tab, Tabs } from '@nextui-org/react';


const Profile: React.FC = () => {
    const { address, isConnected } = useWeb3ModalAccount();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        try {
            if (!isConnected) {
                setLoading(true);
            }
        } catch (error) {
            console.error('Error checking wallet connection:', error);

        }
    }, [address, isConnected]);

    if (loading) {
        return <div>Yükleniyor...</div>;
    }

    console.log('Connected to wallet:', address, "  +++++aaaa   ", isConnected);



    return (
        <section className="flex flex-col items-center justify-center py-12 md:py-16 text-white">
            <div className="w-full max-w-4xl">
                <Tabs
                    aria-label="Profile Sections"
                    //selectedKey={activeTab}
                    //onSelectionChange={(key) => setActiveTab(key as string)}
                    className="w-full text-white"
                >
                    <Tab
                        key="myNfts"
                        title="My NFTs"
                        className="text-lg font-semibold"

                    >
                        <Card className="p-4 rounded-lg text-white">
                            <CardBody>
                                {/* My NFTs Component */}
                            </CardBody>
                        </Card>
                    </Tab>
                    <Tab
                        key="myLoans"
                        title="My Loans"
                        className="text-lg font-semibold"

                    >
                        <Card className="p-4 rounded-lg text-white">
                            <CardBody>
                                {/* My Loans Component */}
                            </CardBody>
                        </Card>
                    </Tab>
                    <Tab
                        key="myList"
                        title="My List"
                        className="text-lg font-semibold"

                    >
                        <Card className="p-4 rounded-lg text-white">
                            <CardBody>
                                {/* My List Component */}
                            </CardBody>
                        </Card>
                    </Tab>
                    <Tab
                        key="myOffers"
                        title="My Offers"
                        className="text-lg font-semibold"

                    >
                        <Card className="p-4 rounded-lg text-white">
                            <CardBody>
                                {/* My Offers Component */}
                            </CardBody>
                        </Card>
                    </Tab>
                </Tabs>
            </div>
        </section>
    );
};

export default Profile;