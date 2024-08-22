
import { db } from './FirebaseConfig';
import { getFirestore, Firestore, collection, addDoc, getDocs, DocumentData, QuerySnapshot, doc, setDoc } from 'firebase/firestore';

// NFT verisini eklemek için fonksiyon
async function addNftListing(walletAddress: string, nftData: any) {
    try {
        const nftCollectionRef = collection(db, 'nft-listing', walletAddress, 'id');
        // Mevcut belgelerin sayısını kontrol et
        const snapshot = await getDocs(nftCollectionRef);
        const newIndex = snapshot.size; // Mevcut belge sayısı yeni indeks olacak
        const docRef = await doc(nftCollectionRef, newIndex.toString());
        await setDoc(docRef, nftData);
        console.log('Document written with ID: ', docRef.id);
    } catch (e) {
        console.error('Error adding document: ', e);
    }
}

// NFT verisini okumak için fonksiyon
async function getNftListingsByAddress(walletAddress: string): Promise<DocumentData[]> {
    const nftCollectionRef = collection(db, 'nft-listing', walletAddress, 'id');
    const querySnapshot: QuerySnapshot = await getDocs(nftCollectionRef);
    const nftListings: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
        nftListings.push(doc.data());
    });
    return nftListings;
}

// Tüm adreslerdeki NFT verilerini almak için fonksiyon
async function getAllNftListings(): Promise<DocumentData[]> {
    const nftListings: DocumentData[] = [];
    try {
        const nftListingCollectionRef = collection(db, 'nft-listing');
        const walletAddressesSnapshot: QuerySnapshot = await getDocs(nftListingCollectionRef);

        for (const walletDoc of walletAddressesSnapshot.docs) {
            const walletAddress = walletDoc.id;
            const nftCollectionRef = collection(db, 'nft-listing', walletAddress, 'id');
            const nftDocsSnapshot: QuerySnapshot = await getDocs(nftCollectionRef);

            nftDocsSnapshot.forEach((nftDoc) => {
                nftListings.push(nftDoc.data());
            });
        }
    } catch (e) {
        console.error('Error getting documents: ', e);
    }
    return nftListings;
}

// Örnek kullanım
const exampleNftData = {
    borrowerAddress: "0x000000000",
    borrowerNonce: 0,
    borrowerSignature: "000000000",
    interestFee: 10,
    loanAmount: 100,
    loanDuration: 100,
    loanTokenAddress: "0x000000000000",
    nftCollateralAddress: "0x0000000000",
    nftTokenId: 0
};

// Veri ekleme
//addNftListing('exampleWalletAddress', exampleNftData);

// Veri okuma
//getNftListingsByAddress('exampleWalletAddress').then((listings) => {
//     console.log(listings);
// });

export { addNftListing, getNftListingsByAddress, getAllNftListings };