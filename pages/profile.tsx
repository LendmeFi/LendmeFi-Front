import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';
import { useWeb3ModalAccount } from '@web3modal/ethers/react'


// Provider, state yönetimi olmadıgı için hata alıyorum.

const Profile: React.FC = () => {
    const { address, isConnected } = useWeb3ModalAccount();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        try {
            if (!isConnected) {
                //router.push('/');
                setLoading(true);
            }
        } catch (error) {
            console.error('Error checking wallet connection:', error);
            // router.push('/');
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