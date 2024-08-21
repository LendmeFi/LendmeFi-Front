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