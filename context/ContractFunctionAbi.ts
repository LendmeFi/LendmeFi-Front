const Contract_Function_Abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "_weth",
                type: "address",
            },
            {
                internalType: "address",
                name: "_usdc",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "target",
                type: "address",
            },
        ],
        name: "AddressEmptyCode",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "AddressInsufficientBalance",
        type: "error",
    },
    {
        inputs: [],
        name: "EnforcedPause",
        type: "error",
    },
    {
        inputs: [],
        name: "ExpectedPause",
        type: "error",
    },
    {
        inputs: [],
        name: "FailedInnerCall",
        type: "error",
    },
    {
        inputs: [],
        name: "InvalidShortString",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
        ],
        name: "OwnableInvalidOwner",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "OwnableUnauthorizedAccount",
        type: "error",
    },
    {
        inputs: [],
        name: "ReentrancyGuardReentrantCall",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "token",
                type: "address",
            },
        ],
        name: "SafeERC20FailedOperation",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "str",
                type: "string",
            },
        ],
        name: "StringTooLong",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [],
        name: "EIP712DomainChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "newFee",
                type: "uint256",
            },
        ],
        name: "LendmeFiFeeChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "loanId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "address",
                name: "borrowerAddress",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "lenderAddress",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "nftCollateralAddress",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "nftTokenId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "address",
                name: "loanTokenAddress",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "loanAmount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "interestFee",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "lendmeFiFee",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "loanStartTime",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "loanDuration",
                type: "uint256",
            },
        ],
        name: "LoanLiquidated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "loanId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "address",
                name: "borrowerAddress",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "lenderAddress",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "nftCollateralAddress",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "nftTokenId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "address",
                name: "loanTokenAddress",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "loanAmount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "interestFee",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "lendmeFiFee",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "loanStartTime",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "loanDuration",
                type: "uint256",
            },
        ],
        name: "LoanRepaid",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "loanId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "address",
                name: "borrowerAddress",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "lenderAddress",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "nftCollateralAddress",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "nftTokenId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "address",
                name: "loanTokenAddress",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "loanAmount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "interestFee",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "lendmeFiFee",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "loanStartTime",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "loanDuration",
                type: "uint256",
            },
        ],
        name: "LoanStarted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "Paused",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "Unpaused",
        type: "event",
    },
    {
        stateMutability: "payable",
        type: "fallback",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "loanAmount",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "feeBasisPoints",
                type: "uint256",
            },
        ],
        name: "calculateLendmeFiFee",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "loanStartTime",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "loanDuration",
                type: "uint256",
            },
        ],
        name: "calculateLoanEndTime",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "loanAmount",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "interestFee",
                type: "uint256",
            },
        ],
        name: "calculateRepaymentAmount",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "loanAmount",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "interestFee",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "lendmeFiFeeBasisPoint",
                type: "uint256",
            },
        ],
        name: "calculateTotalRepaymentAmount",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_nonce",
                type: "uint256",
            },
        ],
        name: "cancelSignatureBeforeLoanStart",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "eip712Domain",
        outputs: [
            {
                internalType: "bytes1",
                name: "fields",
                type: "bytes1",
            },
            {
                internalType: "string",
                name: "name",
                type: "string",
            },
            {
                internalType: "string",
                name: "version",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "chainId",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "verifyingContract",
                type: "address",
            },
            {
                internalType: "bytes32",
                name: "salt",
                type: "bytes32",
            },
            {
                internalType: "uint256[]",
                name: "extensions",
                type: "uint256[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "erc20whitelist",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "erc721whitelist",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "borrowerAddress",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "borrowerNonce",
                        type: "uint256",
                    },
                    {
                        internalType: "address",
                        name: "nftCollateralAddress",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "nftTokenId",
                        type: "uint256",
                    },
                    {
                        internalType: "address",
                        name: "loanTokenAddress",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "loanAmount",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "interestFee",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "loanDuration",
                        type: "uint256",
                    },
                ],
                internalType: "struct EIP712SignMessage.BorrowerData",
                name: "data",
                type: "tuple",
            },
        ],
        name: "getBorrowerMessageHash",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getCurrentTimestamp",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "lenderAddress",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "lenderNonce",
                        type: "uint256",
                    },
                    {
                        internalType: "address",
                        name: "nftCollateralAddress",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "nftTokenId",
                        type: "uint256",
                    },
                    {
                        internalType: "address",
                        name: "loanTokenAddress",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "loanAmount",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "interestFee",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "loanDuration",
                        type: "uint256",
                    },
                ],
                internalType: "struct EIP712SignMessage.LenderData",
                name: "data",
                type: "tuple",
            },
        ],
        name: "getLenderMessageHash",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "loanStartTime",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "loanDuration",
                type: "uint256",
            },
        ],
        name: "isLoanTimeOver",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "lendmeFiFeeBasisPoint",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_loanId",
                type: "uint256",
            },
        ],
        name: "liquidateLoan",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "loanStatus",
        outputs: [
            {
                internalType: "enum LendmeFi.LoanStatus",
                name: "",
                type: "uint8",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "loans",
        outputs: [
            {
                internalType: "uint256",
                name: "loanId",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "borrowerAddress",
                type: "address",
            },
            {
                internalType: "address",
                name: "lenderAddress",
                type: "address",
            },
            {
                internalType: "address",
                name: "nftCollateralAddress",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "nftTokenId",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "loanTokenAddress",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "loanAmount",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "interestFee",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "lendmeFiFee",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "loanStartTime",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "loanDuration",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "numberofActiveLoans",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "numberofTotalLoans",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        name: "onERC721Received",
        outputs: [
            {
                internalType: "bytes4",
                name: "",
                type: "bytes4",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "pause",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "paused",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_loanId",
                type: "uint256",
            },
        ],
        name: "repayLoan",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_token",
                type: "address",
            },
            {
                internalType: "bool",
                name: "_status",
                type: "bool",
            },
        ],
        name: "setERC20Whitelist",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_token",
                type: "address",
            },
            {
                internalType: "bool",
                name: "_status",
                type: "bool",
            },
        ],
        name: "setERC721Whitelist",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_fee",
                type: "uint256",
            },
        ],
        name: "setLendmefiFee",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_borrowerNonce",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "_lenderAddress",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_lenderNonce",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "_nftCollateralAddress",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_nftTokenId",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "_loanTokenAddress",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_loanAmount",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_interestFee",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_loanDuration",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "_borrowerSignature",
                type: "bytes",
            },
            {
                internalType: "bytes",
                name: "_lenderSignature",
                type: "bytes",
            },
        ],
        name: "startLoanByOffer",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_borrowerAddress",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_borrowerNonce",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_lenderNonce",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "_nftCollateralAddress",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_nftTokenId",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "_loanTokenAddress",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_loanAmount",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_interestFee",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_loanDuration",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "_borrowerSignature",
                type: "bytes",
            },
        ],
        name: "startLoanDirectly",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "unpause",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "borrowerAddress",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "borrowerNonce",
                        type: "uint256",
                    },
                    {
                        internalType: "address",
                        name: "nftCollateralAddress",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "nftTokenId",
                        type: "uint256",
                    },
                    {
                        internalType: "address",
                        name: "loanTokenAddress",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "loanAmount",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "interestFee",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "loanDuration",
                        type: "uint256",
                    },
                ],
                internalType: "struct EIP712SignMessage.BorrowerData",
                name: "data",
                type: "tuple",
            },
            {
                internalType: "bytes",
                name: "signature",
                type: "bytes",
            },
        ],
        name: "verifyBorrowerSignature",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "lenderAddress",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "lenderNonce",
                        type: "uint256",
                    },
                    {
                        internalType: "address",
                        name: "nftCollateralAddress",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "nftTokenId",
                        type: "uint256",
                    },
                    {
                        internalType: "address",
                        name: "loanTokenAddress",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "loanAmount",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "interestFee",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "loanDuration",
                        type: "uint256",
                    },
                ],
                internalType: "struct EIP712SignMessage.LenderData",
                name: "data",
                type: "tuple",
            },
            {
                internalType: "bytes",
                name: "signature",
                type: "bytes",
            },
        ],
        name: "verifyLenderSignature",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        stateMutability: "payable",
        type: "receive",
    },
];

export default Contract_Function_Abi