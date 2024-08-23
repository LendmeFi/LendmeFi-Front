
"use client";
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useWeb3ModalAccount } from '@web3modal/ethers/react'


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

    console.log('Connected to wallet:', address, "  +++++aaaaa   ", isConnected);



    return (
        <div>
            <h1>Profile Page</h1>
            <p>This is the profile page.</p>
        </div>

    );
};

export default Profile;