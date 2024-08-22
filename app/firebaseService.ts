
import { ListingDetails, OfferDetails } from '@/types/lendingDetails';
import { db } from './FirebaseConfig';
import { getFirestore, Firestore, collection, addDoc, getDocs, getDoc, DocumentData, QuerySnapshot, doc, setDoc, increment } from 'firebase/firestore';

// NFT verisini eklemek için fonksiyon
async function addNftListing(walletAddress: string, nftData: ListingDetails): Promise<boolean> {
    try {
        const nftCollectionRef = collection(db, 'nft-listing', walletAddress, 'id');
        // Mevcut belgelerin sayısını kontrol et
        const snapshot = await getDocs(nftCollectionRef);
        const newIndex = snapshot.size; // Mevcut belge sayısı yeni indeks olacak
        const docRef = await doc(nftCollectionRef, newIndex.toString());
        await setDoc(docRef, nftData);
        if (await incrementBorrowerNonce(walletAddress)) {
            console.log('Document written with ID: ', docRef.id);
            return true;
        }
        return false;
    } catch (e) {
        console.error('Error adding document: ', e);
        return false;
    }
}

// NFT verisini okumak için fonksiyon
async function getNftListingsByAddress(walletAddress: string): Promise<ListingDetails[]> {
    const nftCollectionRef = collection(db, 'nft-listing', walletAddress, 'id');
    const querySnapshot: QuerySnapshot = await getDocs(nftCollectionRef);
    const nftListings: ListingDetails[] = [];
    querySnapshot.forEach((doc) => {
        nftListings.push(doc.data() as ListingDetails);
    });
    return nftListings;
}

// Tüm adreslerdeki NFT verilerini almak için fonksiyon
async function getAllNftListings(): Promise<ListingDetails[]> {
    const nftListings: ListingDetails[] = [];
    try {
        const nftListingCollectionRef = collection(db, 'nft-listing');
        const walletAddressesSnapshot: QuerySnapshot = await getDocs(nftListingCollectionRef);

        for (const walletDoc of walletAddressesSnapshot.docs) {
            const walletAddress = walletDoc.id;
            const nftCollectionRef = collection(db, 'nft-listing', walletAddress, 'id');
            const nftDocsSnapshot: QuerySnapshot = await getDocs(nftCollectionRef);

            nftDocsSnapshot.forEach((nftDoc) => {
                nftListings.push(nftDoc.data() as ListingDetails);
            });
        }
    } catch (e) {
        console.error('Error getting documents: ', e);
    }
    return nftListings;
}

// Belirli bir NFT verisini almak için fonksiyon
async function getNftListingById(walletAddress: string, docs_id: string): Promise<ListingDetails | null> {
    try {
        const nftCollectionRef = doc(db, 'nft-listing', walletAddress, 'id', docs_id);
        const nftDoc = await getDoc(nftCollectionRef);
        if (nftDoc.exists()) {
            return nftDoc.data() as ListingDetails;
        } else {
            console.log('No such document!');
            return null;
        }
    } catch (e) {
        console.error('Error getting document: ', e);
        return null;
    }
}

// Belirli bir cüzdan adresine NFT teklifi eklemek için fonksiyon
async function addNftOffer(walletAddress: string, offerData: OfferDetails): Promise<boolean> {
    try {
        const nftCollectionRef = collection(db, 'nft-offers', walletAddress, 'id');

        // Mevcut belgelerin sayısını kontrol et
        const snapshot: QuerySnapshot = await getDocs(nftCollectionRef);
        const newIndex = snapshot.size + 1; // Mevcut belge sayısı yeni indeks olacak

        // Yeni belge referansını oluştur
        const docRef = doc(nftCollectionRef, newIndex.toString());

        // Veriyi belgeye yaz
        await setDoc(docRef, offerData);

        if (await incrementLenderNonce(walletAddress)) {
            return true;
            // Başarılı olursa, eklenen belgenin ID'sini konsola yazdır
            console.log('NFT offer added with ID:', docRef.id);
        }
        return false;
    } catch (e) {
        // Hata durumunda, hata mesajını konsola yazdır
        console.error('Error adding document: ', e);
        return false;
    }
}

// Belirli bir cüzdan adresindeki tüm NFT tekliflerini almak için fonksiyon
async function getNftOffersByAddress(walletAddress: string): Promise<OfferDetails[]> {
    const nftOffers: OfferDetails[] = [];
    try {
        const nftOffersCollectionRef = collection(db, 'nft-offers', walletAddress, 'id');
        const nftOffersSnapshot: QuerySnapshot = await getDocs(nftOffersCollectionRef);

        nftOffersSnapshot.forEach((offerDoc) => {
            nftOffers.push(offerDoc.data() as OfferDetails);
        });
    } catch (e) {
        console.error('Error getting documents: ', e);
    }
    return nftOffers;
}

// Belirli bir NFT teklifini almak için fonksiyon
async function getNftOfferById(walletAddress: string, offerId: string): Promise<OfferDetails | null> {
    try {
        const offerDocRef = doc(db, 'nft-offers', walletAddress, 'id', offerId);
        const offerDoc = await getDoc(offerDocRef);
        if (offerDoc.exists()) {
            return offerDoc.data() as OfferDetails;
        } else {
            console.log('No such document!');
            return null;
        }
    } catch (e) {
        console.error('Error getting document: ', e);
        return null;
    }
}

// Borrower nonce değerini almak için fonksiyon
async function getBorrowerNonce(walletAddress: string): Promise<number | undefined> {
    try {
        const borrowerDocRef = doc(db, 'borrowers', walletAddress);
        const docSnap = await getDoc(borrowerDocRef);
        if (docSnap.exists()) {
            return docSnap.data().nonce;
        } else {
            await setDoc(borrowerDocRef, { nonce: 0 }); // nonce değerini başlangıç olarak 0 yapıyoruz
            return 0;
        }
    } catch (e) {
        console.error('Error getting borrower nonce: ', e);
        return undefined;
    }
}

// Lender nonce değerini almak için fonksiyon
async function getLenderNonce(walletAddress: string): Promise<number | undefined> {
    try {
        const lenderDocRef = doc(db, 'lenders', walletAddress);
        const docSnap = await getDoc(lenderDocRef);
        if (docSnap.exists()) {
            return docSnap.data().nonce;
        } else {
            await setDoc(lenderDocRef, { nonce: 0 }); // nonce değerini başlangıç olarak 0 yapıyoruz
            return 0;
        }
    } catch (e) {
        console.error('Error getting lender nonce: ', e);
        return undefined;
    }
}

// Lender nonce eklemek için fonksiyon
async function incrementLenderNonce(walletAddress: string): Promise<boolean> {
    try {
        const lenderDocRef = doc(db, 'lenders', walletAddress);
        const docSnap = await getDoc(lenderDocRef);
        if (docSnap.exists()) {
            await setDoc(lenderDocRef, { nonce: increment(1) }, { merge: true });
            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.error('Error setting lender nonce: ', e);
        return false;
    }
}

// Borrower nonce eklemek için fonksiyon
async function incrementBorrowerNonce(walletAddress: string): Promise<boolean> {
    try {
        const borrowerDocRef = doc(db, 'borrowers', walletAddress);
        const docSnap = await getDoc(borrowerDocRef);
        if (docSnap.exists()) {
            await setDoc(borrowerDocRef, { nonce: increment(1) }, { merge: true });
            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.error('Error setting borrower nonce: ', e);
        return false;
    }
}


// // Örnek kullanım
// const exampleOfferData = {
//     lenderAddress: "0x000000000",
//     lenderNonce: 0,
//     lenderSignature: "000000000",
//     interestFee: 10,
//     loanAmount: 100,
//     loanDuration: 100,
//     loanTokenAddress: "0x000000000000",
//     nftCollateralAddress: "0x0000000000",
//     nftTokenId: 0
// };

// Veri ekleme
// addNftOffer('exampleWalletAddress', exampleOfferData);

// Veri okuma
// getNftOffersByAddress('exampleWalletAddress').then((offers) => {
//     console.log(offers);
// });

// Belirli bir teklifi okuma
// getNftOfferById('exampleWalletAddress', 'offerId').then((offer) => {
//     if (offer) {
//         console.log('NFT Offer:', offer);
//     } else {
//         console.log('No NFT offer found.');
//     }
// });





// getNftListingById(walletAddress, docs_id).then((nftData) => {
//     if (nftData) {
//         console.log('NFT Data:', nftData);
//     } else {
//         console.log('No NFT data found.');
//     }
// });


// Örnek kullanım
// const exampleNftData = {
//     borrowerAddress: "0x000000000",
//     borrowerNonce: 0,
//     borrowerSignature: "000000000",
//     interestFee: 10,
//     loanAmount: 100,
//     loanDuration: 100,
//     loanTokenAddress: "0x000000000000",
//     nftCollateralAddress: "0x0000000000",
//     nftTokenId: 0
// };

// Veri ekleme
//addNftListing('exampleWalletAddress', exampleNftData);

// Veri okuma
//getNftListingsByAddress('exampleWalletAddress').then((listings) => {
//     console.log(listings);
// });

export { addNftListing, getNftListingsByAddress, getAllNftListings, getNftListingById, addNftOffer, getNftOffersByAddress, getNftOfferById, getBorrowerNonce, getLenderNonce, };