export interface ListingDetails {
    borrowerAddress: string;
    borrowerNonce: number;
    nftCollateralAddress: string;
    nftTokenId: number;
    loanTokenAddress: string;
    loanAmount: bigint;
    interestFee: bigint;
    loanDuration: number;
    borrowerSignature: string;
}

export interface OfferDetails {
    lenderAddress: string;
    lenderNonce: number;
    nftCollateralAddress: string;
    nftTokenId: number;
    loanTokenAddress: string;
    loanAmount: bigint;
    interestFee: bigint;
    loanDuration: number;
    lenderSignature: string;
}

export interface loansDetails {
    loanId: number;
    borrowerAddress: string;
    lenderAddress: string;
    nftCollateralAddress: string;
    nftTokenId: number;
    loanTokenAddress: string;
    loanAmount: bigint;
    interestFee: bigint;
    lendmeFiFee: bigint;
    loanStartTime: number;
    loanDuration: number;
}

export interface nftData{
    nftCollateralAddress: string;
    nftTokenId: number;
    nftPicture: string;
    nftName: string;
    nftSymbol: string;
}