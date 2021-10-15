window.onload = function () {
  console.log("Client-side code running");
  //Summon enemy Skeletoon

  document.getElementById("connect wallet").onclick = function connect() {
    connectWallet();
  };

  document.getElementById("findSkeletoon").onclick = function show() {
    getNFTsOfUser();
  };

  document.getElementById("battlegrounds").onclick = function show() {
    battleGrounds();
  };

  document.getElementById("battlebuttonlog").onclick = function show() {
    showBattleLog();
  };

  document.getElementById("registertoken").onclick = function show() {
    registerSkeletoon();
  };

};
var walletID = "x";
var theTransactionHash = "";
//Pakeist abix2 kontraktus ir network chain
var abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "baseURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "maxMintAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "maxSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_mintAmount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "_state",
				"type": "bool"
			}
		],
		"name": "pause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "paused",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "_data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "sendtoken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_newBaseURI",
				"type": "string"
			}
		],
		"name": "setBaseURI",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tokenID",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_extensionURI",
				"type": "string"
			}
		],
		"name": "setTokenExtensionURI",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_newmaxMintAmount",
				"type": "uint256"
			}
		],
		"name": "setmaxMintAmount",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenOfOwnerByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "walletOfOwner",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	}
];
  
  var abibattles = [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenIdchallenger",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenIdchallenged",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "battleId",
          type: "uint256",
        },
      ],
      name: "ChallengedToBattle",
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
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "RegisterTokenToBattleGrounds",
      type: "event",
    },
    {
      inputs: [],
      name: "battleCount",
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
          name: "",
          type: "uint256",
        },
      ],
      name: "battleGroundsTokens",
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
          name: "tokenchallenged",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "tokenchallenger",
          type: "uint256",
        },
      ],
      name: "challengeSkeletoon",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "earlyAccess",
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
          internalType: "bool",
          name: "state",
          type: "bool",
        },
      ],
      name: "earlyAccessState",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "wallet",
          type: "address",
        },
        {
          internalType: "bool",
          name: "state",
          type: "bool",
        },
      ],
      name: "earlyAccessWallet",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "gasFeeInternal",
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
          name: "logId",
          type: "uint256",
        },
      ],
      name: "getBattleLog",
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
      name: "getGasFee",
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
          name: "tokenid",
          type: "uint256",
        },
      ],
      name: "getHP",
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
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "getStakeAmount",
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
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "getchallengeAmount",
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
          name: "tokenid",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "battleStake",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "challengeStake",
          type: "uint256",
        },
      ],
      name: "goToBattle",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenid",
          type: "uint256",
        },
      ],
      name: "isTokenInBattleGrounds",
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
          name: "wallet",
          type: "address",
        },
      ],
      name: "isWalletLogicHandler",
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
      name: "lastBattleWithdrawn",
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
      inputs: [
        {
          internalType: "bool",
          name: "_state",
          type: "bool",
        },
      ],
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
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "registerToBattleGrounds",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenid",
          type: "uint256",
        },
      ],
      name: "removeFromBattlegrounds",
      outputs: [],
      stateMutability: "payable",
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
          name: "tokenid",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "actionList",
          type: "uint256",
        },
      ],
      name: "setActionListOwner",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_contract",
          type: "address",
        },
      ],
      name: "setAddressSPSK",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "logId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "tokenchallenger",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "tokenchallenged",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "damageDealtchallenger",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "damageDealtchallenged",
          type: "uint256",
        },
      ],
      name: "setBattleLog",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_gas",
          type: "uint256",
        },
      ],
      name: "setGasFee",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenid",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "hp",
          type: "uint256",
        },
      ],
      name: "setHP",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenid",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "possibleActions",
          type: "uint256",
        },
      ],
      name: "setPossibleActions",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "winnerTokenId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "challengedTokenId",
          type: "uint256",
        },
      ],
      name: "settleBattle",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "tokensInBattleAmount",
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
      inputs: [
        {
          internalType: "uint256",
          name: "tokenid",
          type: "uint256",
        },
      ],
      name: "viewPossibleActions",
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
          name: "tokenid",
          type: "uint256",
        },
      ],
      name: "viewSetActions",
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
          name: "wallet",
          type: "address",
        },
        {
          internalType: "bool",
          name: "state",
          type: "bool",
        },
      ],
      name: "walletAsLogicHandler",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "withdrawGas",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "withdrawSetAmount",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
  ];
  
  var address = "0x1dadaa7e55b2c7238ed04891ac182ea1468b79b9";
  var contractIDBattles = "0x194f15978631D7258B9151C2A60adCdd37479425";
  var networkChain = 250; //250 normal 4002 test
  

var getJSON = function (url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "json";
  xhr.onload = function () {
    var status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};

function registerSkeletoon() {
    let tokenid = document.getElementById("tokenidregister").value;
  
    if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      ethereum
        .enable()
        .then(() => {
          console.log("Ethereum enabled");
          web3.eth.getAccounts(async function (err, acc) {
            if (err != null) {
              self.setStatus("There was an error fetching your accounts");
              return;
            }
            if (acc.length > 0) {
              var contractBattles = new web3.eth.Contract(abibattles, contractIDBattles);
              let contractFunctionData = contractBattles.methods.registerToBattleGrounds(tokenid).encodeABI();
              web3.eth
                .sendTransaction({
                  from: acc[0],
                  to: contractIDBattles,
                  data: contractFunctionData,
                })
                .on("receipt", async function (receipt) {
                  console.log(receipt);
                });
            }
          });
        })
        .catch(() => {
          console.warn("User didn't allow access to accounts.");
          waitLogin();
        });
    } else {
      console.log("ERROR.");
    }
  }
  
  function removeFromBattleGrounds() {
    let tokenid = document.getElementById("returnfrombattlegrounds").value;
  
    if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      ethereum
        .enable()
        .then(() => {
          console.log("Ethereum enabled");
          web3.eth.getAccounts(async function (err, acc) {
            if (err != null) {
              self.setStatus("There was an error fetching your accounts");
              return;
            }
            if (acc.length > 0) {
              var contractBattles = new web3.eth.Contract(abibattles, contractIDBattles);
              let contractFunctionData = contractBattles.methods.removeFromBattlegrounds(tokenid).encodeABI();
              web3.eth
                .sendTransaction({
                  from: acc[0],
                  to: contractIDBattles,
                  data: contractFunctionData,
                })
                .on("receipt", async function (receipt) {
                  console.log(receipt);
                });
            }
          });
        })
        .catch(() => {
          console.warn("User didn't allow access to accounts.");
          waitLogin();
        });
    } else {
      console.log("ERROR.");
    }
  }

function battleGrounds() {
  // DELETE ALREADY SHOWING NFTs
  const myNode = document.getElementById("opponentSkeletoon");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.lastChild);
  }
  var contract = new web3.eth.Contract(abi, address);
  var contractBattles = new web3.eth.Contract(abibattles, contractIDBattles);
  contractBattles.methods.tokensInBattleAmount().call((err, result) => {
    for (i = 0; i < result; i++) {
      let CSSforSkelly = `u-battlegrounds-listed-0`;
      console.log(CSSforSkelly);
      contractBattles.methods.battleGroundsTokens(i).call((err, resultBattleId) => {
        contract.methods.tokenURI(resultBattleId).call(async (err, result) => {
          let entry = (await contractBattles.methods.getchallengeAmount(resultBattleId).call()) / 1000000000000000000;
          let prize = (await contractBattles.methods.getStakeAmount(resultBattleId).call()) / 1000000000000000000;
          let hp = await contractBattles.methods.getHP(resultBattleId).call();  

          getJSON(result, function (err, data) {
            var skellyDiv = document.createElement("div");
            skellyDiv.setAttribute("class", "u-skelly-div");
            skellyDiv.setAttribute("id", `div-${data.id}`);
            document.getElementById("opponentSkeletoon").appendChild(skellyDiv);
            console.log(data.id);
            var theURL = data.image;
            var img = document.createElement("img");
            var tokenNumber = document.createElement("h2");
            //var lineBreak = document.createElement("br");

            img.setAttribute("class", CSSforSkelly);
            img.setAttribute("id", data.id);
            tokenNumber.setAttribute("class", CSSforSkelly);

            img.src = theURL;
            img.class = "nftimages";
            //img.style = "width: 100%;max-width: 250px;height: auto;display: block;margin-left: auto;margin-right: auto;";
            tokenNumber.style = "font-size: 20px;text-align: center;";
            tokenNumber.innerHTML = data.name + " HP: " + hp + " Prize: " + prize + " FTM Entry :" + entry + " FTM";
            document.getElementById(`div-${data.id}`).appendChild(tokenNumber);
            document.getElementById(`div-${data.id}`).appendChild(img);
            //document.getElementById("opponentSkeletoon").appendChild(lineBreak);

            var json = data.attributes;
            json.shift();

            var ul = document.createElement("ul");
            ul.setAttribute("id", "PossibleActionList");
            ul.setAttribute("class", "u-possible-actions-battlegrounds");
            var actionArray = dictionaryJsonToArray(json);
            //ul.style="font-size: max(2vw, 30px); text-align: center; margin-left: auto; margin-right: auto; position: relative; top: -500px; left: 350px;list-style: none";

            document.getElementById(`div-${data.id}`).appendChild(ul);

            for (i = 0; i < 8; i++) {
              var li = document.createElement("li");
              li.setAttribute("class", "action");
              li.setAttribute("class", "u-possible-move-list-mini");
              //li.setAttribute("id", `${i + 1}${actionArray[i]}`);

              ul.appendChild(li);
              actionInt = (i + 1) * 10 + actionArray[i];
              li.innerHTML = li.innerHTML + dictionaryIntToAction(actionInt);
            }

            var battleButton = document.createElement("img");
            battleButton.setAttribute("id", data.id);
            battleButton.setAttribute("src", "images/battleimg.png");
            battleButton.setAttribute("class", "u-battle-button");
            battleButton.setAttribute("onclick", `addOponentSkeletoon(${data.id})`);
            document.getElementById("opponentSkeletoon").appendChild(battleButton);
          });
        });
      });
    }
  });
}

function connectWallet() {
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    ethereum
      .enable()
      .then(async () => {
        let chain = await web3.eth.getChainId();
        console.log(chain);
        if (chain != networkChain) {
          document.getElementById("demo").innerHTML = "Please use fantom network!";
          return;
        }
        console.log("Ethereum enabled");
        web3.eth.getAccounts(function (err, acc) {
          if (err != null) {
            self.setStatus("There was an error fetching your accounts");
            return;
          }
          if (acc.length > 0) {
            console.log(acc);
            walletID = acc[0];
            //document.getElementById("connect wallet").innerHTML = acc[0];
            //document.getElementById("connect wallet").style = "width: 150px; display: inline-block;"
            document.getElementById("demo").innerHTML = "CONNECTED! WALLET:" + acc[0];
            return;
          }
        });
      })
      .catch(() => {
        console.warn("User didn't allow access to accounts.");
        document.getElementById("demo").innerHTML = "CONNECTION REJECTED!";
        waitLogin();
      });
  } else {
    console.log("Non-Ethereum browser detected. You should consider installing MetaMask.");
    document.getElementById("demo").innerHTML = "METAMASK NOT FOUND! PLEASE INSTALL OR USE A DAPP!";
  }
}

function getNFTsOfUser() {
  // DELETE ALREADY SHOWING NFTs
  const myNode = document.getElementById("myBattleSkeletoon");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.lastChild);
  }

  //Summon your skeletoon
  let tokenid = document.getElementById("token_id").value;
  var contract = new web3.eth.Contract(abi, address);
  contract.methods.balanceOf(walletID).call((err, result) => {
    if (!err) {
      numerOfTokensUserHas = result;
      arrayOfTokensUserHas = [];
      contract.methods.tokenURI(tokenid).call((err, result) => {
        console.log(result);
        getJSON(result, function (err, data) {
          skeletoonAndActionList(data);
        });
      });
    } else document.getElementById("numberoftokens").innerHTML = err;
  });
}

let moveList = [];

async function skeletoonAndActionList(data) {
  var skellyDiv = document.createElement("div");
  skellyDiv.setAttribute("class", "u-skelly-large");
  skellyDiv.setAttribute("id", `div-my-skeletoon`);
  document.getElementById("myBattleSkeletoon").appendChild(skellyDiv);

  var contractBattles = new web3.eth.Contract(abibattles, contractIDBattles);
  let hp = await contractBattles.methods.getHP(data.id).call();

  var theURL = data.image;
  var img = document.createElement("img");
  var tokenNumber = document.createElement("h2");

  var lineBreak = document.createElement("br");
  img.src = theURL;
  img.class = "nftimages";
  img.style = "width: 100%; max-width: 500px; height: auto; display: block; right: 250px; position: relative";

  tokenNumber.style = "font-size: max(2vw, 30px); text-align: center; right: 300px; position: relative";
  tokenNumber.innerHTML = data.name + " HP: " + hp;
  let tokenid = data.id;

  document.getElementById("div-my-skeletoon").appendChild(tokenNumber);
  document.getElementById("div-my-skeletoon").appendChild(img);
  var json = data.attributes;
  json.shift();

  var ul = document.createElement("ul");
  ul.setAttribute("id", "PossibleActionList-Mine");
  var actionArray = dictionaryJsonToArray(json);
  //ul.style="font-size: max(2vw, 30px); text-align: center; margin-left: auto; margin-right: auto; position: relative; top: -500px; left: 350px;list-style: none";

  document.getElementById("div-my-skeletoon").appendChild(ul);

  document.getElementById("div-my-skeletoon").appendChild(lineBreak);

  var moveListHTML = document.createElement("div");

  moveListHTML.setAttribute("class", "u-move-list-title");
  moveListHTML.innerHTML = "Your current move list:";

  document.getElementById("div-my-skeletoon").appendChild(moveListHTML);

  var clearMoveList = document.createElement("div");

  clearMoveList.setAttribute("class", "u-move-list-clear");
  clearMoveList.innerHTML = "Clear";
  clearMoveList.setAttribute("onclick", `clearMoveList()`);

  document.getElementById("myBattleSkeletoon").appendChild(clearMoveList);

  var listTitle = document.createElement("li");
  listTitle.setAttribute("class", "u-move-list-title-actions");
  listTitle.innerHTML = "Your action List:";

  ul.appendChild(listTitle);

  for (i = 0; i < 8; i++) {
    var li = document.createElement("li");
    li.setAttribute("class", "action");
    //li.setAttribute("href", "#");
    li.setAttribute("class", "u-possible-move-list");
    li.setAttribute("id", `${i + 1}${actionArray[i]}`);
    li.setAttribute("onclick", `addAction(${i + 1}${actionArray[i]}, ${tokenid})`);

    ul.appendChild(li);
    actionInt = (i + 1) * 10 + actionArray[i];
    li.innerHTML = li.innerHTML + dictionaryIntToAction(actionInt);
  }
}

function addOponentSkeletoon(int) {
  // DELETE ALREADY SHOWING NFTs
  const myNode = document.getElementById("opponentSkeletoon");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.lastChild);
  }
  var contract = new web3.eth.Contract(abi, address);
  var contractBattles = new web3.eth.Contract(abibattles, contractIDBattles);

  let CSSforSkelly = `u-battlegrounds-listed-0`;
  console.log(CSSforSkelly);
  contract.methods.tokenURI(int).call(async (err, result) => {
    let entry = (await contractBattles.methods.getchallengeAmount(int).call()) ;
    let prize = (await contractBattles.methods.getStakeAmount(int).call()) / 1000000000000000000;
    let hp = await contractBattles.methods.getHP(int).call();

    getJSON(result, function (err, data) {
      var skellyDiv = document.createElement("div");
      skellyDiv.setAttribute("class", "u-skelly-div");
      skellyDiv.setAttribute("id", `div-enemy-skeletoon`);
      document.getElementById("opponentSkeletoon").appendChild(skellyDiv);

      var theURL = data.image;
      var img = document.createElement("img");
      var tokenNumber = document.createElement("h2");

      var lineBreak = document.createElement("br");
      img.src = theURL;
      img.class = "nftimages";
      img.style = "width: 100%; max-width: 500px; height: auto; display: block; right: 250px; position: relative";

      tokenNumber.style = "font-size: max(2vw, 30px); text-align: center; right: 300px; position: relative";
      tokenNumber.innerHTML = data.name + " HP: " + hp + " Prize: " + prize + " FTM Entry :" + entry / 1000000000000000000 + " FTM";
      document.getElementById("div-enemy-skeletoon").setAttribute("entry", entry);
      document.getElementById("div-enemy-skeletoon").setAttribute("opponentId", data.id);
      document.getElementById("div-enemy-skeletoon").appendChild(tokenNumber);
      document.getElementById("div-enemy-skeletoon").appendChild(img);
      var json = data.attributes;
      json.shift();

      var ul = document.createElement("ul");
      ul.setAttribute("id", "PossibleActionList");
      var actionArray = dictionaryJsonToArray(json);
      //ul.style="font-size: max(2vw, 30px); text-align: center; margin-left: auto; margin-right: auto; position: relative; top: -500px; left: 350px;list-style: none";

      document.getElementById("div-enemy-skeletoon").appendChild(ul);

      document.getElementById("div-enemy-skeletoon").appendChild(lineBreak);

      var listTitle = document.createElement("li");
      listTitle.setAttribute("class", "u-move-list-title-actions");
      listTitle.innerHTML = "Opponent possible actions:";

      ul.appendChild(listTitle);

      for (i = 0; i < 8; i++) {
        var li = document.createElement("li");
        //li.setAttribute("class", "action");
        //li.setAttribute("href", "#");
        li.setAttribute("class", "u-possible-move-list");
        //li.setAttribute("id", `${i + 1}${actionArray[i]}`);
        //li.setAttribute("onclick", `addAction(${i + 1}${actionArray[i]})`);

        ul.appendChild(li);
        actionInt = (i + 1) * 10 + actionArray[i];
        li.innerHTML = li.innerHTML + dictionaryIntToAction(actionInt);
      }
    });
  });
}

function addAction(int, tokenid) {
  if (moveList.length < 5 && !moveList.includes(int)) {
    document.getElementById(int).innerHTML = "Added to move list";
    document.getElementById(int).setAttribute("class", "u-possible-move-added");
    moveList.push(int);


    var actionInMoveSet = document.createElement("div");

    actionInMoveSet.setAttribute("id", "move");
    actionInMoveSet.setAttribute("class", "u-move-list");
    actionInMoveSet.innerHTML = actionInMoveSet.innerHTML + dictionaryIntToAction(int);

    document.getElementById("myBattleSkeletoon").appendChild(actionInMoveSet);
    if (moveList.length == 5) {
      let actionInt = 0;
      for (i = 0; i < 5; i++) {
        actionInt += moveList[i] * 10 ** ((4 - i) * 2);
      }
      var sendToBattle = document.createElement("div");

      sendToBattle.setAttribute("id", "goToBattleButton");
      sendToBattle.setAttribute("class", "u-move-list-clear");
      sendToBattle.innerHTML = "Go to battle!";
      sendToBattle.setAttribute("onclick", `sendToBattle(${tokenid},${actionInt})`);
      document.getElementById("myBattleSkeletoon").appendChild(sendToBattle);
    }
  } else if (moveList.length >= 5) {
    console.log("Move list fully set");
  } else if (moveList.includes(int)) {
    console.log("Action already included");
  }
}

function sendToBattle(tokenId, actionInt) {
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    ethereum
      .enable()
      .then(() => {
        console.log("Ethereum enabled");
        web3.eth.getAccounts(async function (err, acc) {
          if (err != null) {
            self.setStatus("There was an error fetching your accounts");
            return;
          }
          if (acc.length > 0) {
            console.log(actionInt);
            console.log(tokenId);
            var contractBattles = new web3.eth.Contract(abibattles, contractIDBattles);
            let contractFunctionData = contractBattles.methods.setActionListOwner(tokenId, actionInt).encodeABI();
            web3.eth
              .sendTransaction({
                from: acc[0],
                to: contractIDBattles,
                data: contractFunctionData,
              })
              .on("receipt", async function (receipt) {
                console.log(receipt);
               

                let opponentid = parseInt(document.getElementById("div-enemy-skeletoon").getAttribute("opponentId"));
                let contractFunctionData2 = contractBattles.methods.challengeSkeletoon(opponentid, tokenId).encodeABI();
                let entry = document.getElementById("div-enemy-skeletoon").getAttribute("entry");
                if (entry != 0) {
                contractBattles.methods.getGasFee().call((err,result) =>{
                    console.log("WEI");
                    console.log(web3.utils.toWei(result));
                    console.log(web3.utils.toWei(entry));  
                    console.log("just");
                    console.log(result);
                    console.log(entry);  
                    console.log("type of ");
                    console.log(typeof result);
                    console.log(typeof entry);


                    web3.eth
                    .sendTransaction({
                        from: acc[0],
                        to: contractIDBattles,
                        value: parseInt(entry) + parseInt(result),
                        data: contractFunctionData2,
                    })
                    .on("receipt", function (receipt) {
                        console.log(receipt);
                        let logID = web3.utils.hexToNumber(receipt.logs[0].topics[3]);
                        appendLog(logID)
                    }).on('error', function(err, receipt){
                        console.log(err);
                });
                });
            } else {
                contractBattles.methods.getGasFee().call((err,result) =>{
                    console.log("WEI");
                    console.log(web3.utils.toWei(result));
                    console.log(web3.utils.toWei(entry));  
                    console.log("just");
                    console.log(result);
                    console.log(entry);  
                    console.log("type of ");
                    console.log(typeof result);
                    console.log(typeof entry);


                    web3.eth
                    .sendTransaction({
                        from: acc[0],
                        to: contractIDBattles,
                        value: parseInt(result),
                        data: contractFunctionData2,
                    })
                    .on("receipt", function (receipt) {
                        console.log(receipt);
                        let logID = web3.utils.hexToNumber(receipt.logs[0].topics[3]);
                        appendLog(logID)
                    }).on('error', function(err, receipt){
                        console.log(err);
                });
                });
            }
              }).on('error', function(err, receipt){
                console.log(err);
            });
          }
        });
      })
      .catch(() => {
        console.warn("User didn't allow access to accounts.");
        waitLogin();
      });
  } else {
    console.log("ERROR.");
  }
}

function appendLog(logid) {
    var log = document.createElement("div");

    log.setAttribute("id", "log");
    log.innerHTML = "Your battle log is: " + logid;
    document.getElementById("myBattleSkeletoon").appendChild(log);
}

function clearMoveList() {
  console.log(moveList.length);
  let removed = [];
  let length = moveList.length;

  for (i = 0; i < length; i++) {
    console.log(i);

    const myNode = document.getElementById("move");
    myNode.remove();

    removed[i] = moveList.shift();
    document.getElementById(removed[i]).remove();
    console.log(removed[i]);
  }
  document.getElementById("goToBattleButton").remove();
  var ul = document.getElementById("PossibleActionList-Mine");

  for (i = 0; i < removed.length; i++) {
    var li = document.createElement("li");
    li.setAttribute("class", "action");
    li.setAttribute("class", "u-possible-move-list");
    li.setAttribute("id", `${removed[i]}`);
    li.setAttribute("onclick", `addAction(${removed[i]})`);

    ul.appendChild(li);

    li.innerHTML = li.innerHTML + dictionaryIntToAction(removed[i]);
  }
}

function dictionaryTraitToInt(attribute, actionlist) {
  if (actionlist == 0) {
    actionlist = 1020304050607080;
  }
  //Body - 1X
  if (attribute.value == "Partial Ribs") {
    actionlist += 100000000000000;
  }
  if (attribute.value == "Full Ribs") {
    actionlist += 200000000000000;
  }
  if (attribute.value == "Heart") {
    actionlist += 300000000000000;
  }
  if (attribute.value == "Neon spine") {
    actionlist += 400000000000000;
  }
  if (attribute.value == "Webbed") {
    actionlist += 500000000000000;
  }
  if (attribute.value == "Rainbow") {
    actionlist += 600000000000000;
  }
  //Cape - 2X
  if (attribute.value == "Errr") {
    actionlist += 1000000000000;
  }
  if (attribute.value == "Ghost") {
    actionlist += 2000000000000;
  }
  //PET - 3X
  if (attribute.value == "Bat") {
    actionlist += 10000000000;
  }
  if (attribute.value == "Spider") {
    actionlist += 20000000000;
  }
  if (attribute.value == "Crow") {
    actionlist += 30000000000;
  }
  if (attribute.value == "Ghost Puppy") {
    actionlist += 40000000000;
  }
  if (attribute.value == "Witch Cat") {
    actionlist += 50000000000;
  }

  //ITEM - 4X
  if (attribute.value == "Sword") {
    actionlist += 100000000;
  }
  if (attribute.value == "Bag of Jokes") {
    actionlist += 200000000;
  }
  if (attribute.value == "Candle") {
    actionlist += 300000000;
  }
  if (attribute.value == "Magic Sword") {
    actionlist += 400000000;
  }
  if (attribute.value == "Globe") {
    actionlist += 500000000;
  }
  if (attribute.value == "Spellbook") {
    actionlist += 600000000;
  }
  //Mouth - 5X
  if (attribute.value == "Burning") {
    actionlist += 1000000;
  }
  if (attribute.value == "Gold Teeth") {
    actionlist += 2000000;
  }
  if (attribute.value == "Tentacles") {
    actionlist += 3000000;
  }
  //HEAD - 6X
  if (attribute.value == "Err") {
    actionlist += 10000;
  }
  if (attribute.value == "Pumpkin") {
    actionlist += 20000;
  }

  //EYES - 7X
  if (attribute.value == "Cheeky") {
    actionlist += 100;
  }
  if (attribute.value == "Angry") {
    actionlist += 200;
  }
  if (attribute.value == "Bat") {
    actionlist += 300;
  }
  if (attribute.value == "Bright") {
    actionlist += 400;
  }
  if (attribute.value == "Dazed") {
    actionlist += 500;
  }
  if (attribute.value == "Bug Eyes") {
    actionlist += 600;
  }
  if (attribute.value == "Greek Evil Eye") {
    actionlist += 700;
  }
  // HAT - 8X

  if (attribute.value == "Halo") {
    actionlist += 1;
  }
  if (attribute.value == "Top Hat") {
    actionlist += 2;
  }
  if (attribute.value == "Halo With Wings") {
    actionlist += 3;
  }
  if (attribute.value == "Horns") {
    actionlist += 4;
  }
  if (attribute.value == "Mushrooms") {
    actionlist += 5;
  }
  if (attribute.value == "Bunny Ears") {
    actionlist += 6;
  }
  if (attribute.value == "Mushrooms Muscaria") {
    actionlist += 7;
  }

  return actionlist;
}

function dictionaryJsonToArray(attribute) {
  let actionArray = [];

  //Body - 1X
  if (attribute[0].value == "Partial Ribs") {
    actionArray[0] = 1;
  } else if (attribute[0].value == "Full Ribs") {
    actionArray[0] = 2;
  } else if (attribute[0].value == "Heart") {
    actionArray[0] = 3;
  } else if (attribute[0].value == "Neon spine") {
    actionArray[0] = 4;
  } else if (attribute[0].value == "Webbed") {
    actionArray[0] = 5;
  } else if (attribute[0].value == "Rainbow") {
    actionArray[0] = 6;
  } else {
    actionArray[0] = 0;
  }
  //Cape - 2X
  if (attribute[1].value == "Errr") {
    actionArray[1] = 1;
  } else if (attribute[1].value == "Ghost") {
    actionArray[1] = 2;
  } else {
    actionArray[1] = 0;
  }
  //EYES - 7X
  if (attribute[6].value == "Cheeky") {
    actionArray[6] = 1;
  } else if (attribute[6].value == "Angry") {
    actionArray[6] = 2;
  } else if (attribute[6].value == "Bat") {
    actionArray[6] = 3;
  } else if (attribute[6].value == "Bright") {
    actionArray[6] = 4;
  } else if (attribute[6].value == "Dazed") {
    actionArray[6] = 5;
  } else if (attribute[6].value == "Bug Eyes") {
    actionArray[6] = 6;
  } else if (attribute[6].value == "Greek Evil Eye") {
    actionArray[6] = 7;
  } else {
    actionArray[6] = 0;
  }
  // HAT - 8X

  if (attribute[7].value == "Halo") {
    actionArray[7] = 1;
  } else if (attribute[7].value == "Top Hat") {
    actionArray[7] = 2;
  } else if (attribute[7].value == "Halo With Wings") {
    actionArray[7] = 3;
  } else if (attribute[7].value == "Horns") {
    actionArray[7] = 4;
  } else if (attribute[7].value == "Mushrooms") {
    actionArray[7] = 5;
  } else if (attribute[7].value == "Bunny Ears") {
    actionArray[7] = 6;
  } else if (attribute[7].value == "Mushrooms Muscaria") {
    actionArray[7] = 7;
  } else {
    actionArray[7] = 0;
  }
  //HEAD - 6X
  if (attribute[5].value == "Err") {
    actionArray[5] = 1;
  } else if (attribute[5].value == "Pumpkin") {
    actionArray[5] = 2;
  } else {
    actionArray[5] = 0;
  }
  //ITEM - 4X
  if (attribute[3].value == "Sword") {
    actionArray[3] = 1;
  } else if (attribute[3].value == "Bag of Jokes") {
    actionArray[3] = 2;
  } else if (attribute[3].value == "Candle") {
    actionArray[3] = 3;
  } else if (attribute[3].value == "Magic Sword") {
    actionArray[3] = 4;
  } else if (attribute[3].value == "Globe") {
    actionArray[3] = 5;
  } else if (attribute[3].value == "Spellbook") {
    actionArray[3] = 6;
  } else {
    actionArray[3] = 0;
  }
  //Mouth - 5X
  if (attribute[4].value == "Burning") {
    actionArray[4] = 1;
  } else if (attribute[4].value == "Gold Teeth") {
    actionArray[4] = 2;
  } else if (attribute[4].value == "Tentacles") {
    actionArray[4] = 3;
  } else {
    actionArray[4] = 0;
  }
  //PET - 3X
  if (attribute[2].value == "Bat") {
    actionArray[2] = 1;
  } else if (attribute[2].value == "Spider") {
    actionArray[2] = 2;
  } else if (attribute[2].value == "Crow") {
    actionArray[2] = 3;
  } else if (attribute[2].value == "Ghost Puppy") {
    actionArray[2] = 4;
  } else if (attribute[2].value == "Witch Cat") {
    actionArray[2] = 5;
  } else {
    actionArray[2] = 0;
  }

  return actionArray;
}

function dictionaryIntToAction(actionInt) {
  //Body - 1X
  if (actionInt == 11) {
    return "+5% to evade attacks";
  } else if (actionInt == 12) {
    return "+10% damage mitigation";
  } else if (actionInt == 13) {
    return "+20% damage mitigation";
  } else if (actionInt == 14) {
    return "+10% to evade attacks";
  } else if (actionInt == 15) {
    return "15% increased chance to hit enemy";
  } else if (actionInt == 16) {
    return "+16% to evade attacks and 16% increased chance to hit enemy";
  }
  //Cape - 2X
  if (actionInt == 20) {
    return "+5% to evade attacks";
  } else if (actionInt == 21) {
    return "ERR 3 Random actions";
  } else if (actionInt == 22) {
    return "10% chance to ressurect";
  }
  //PET - 3X
  else if (actionInt == 30) {
    return "Deal (0-20) Damage";
  } else if (actionInt == 31) {
    return "Deal (5-20) Damage";
  } else if (actionInt == 32) {
    return "Deal (1-5) Damage for following turns";
  } else if (actionInt == 33) {
    return "10% increased chance to hit enemy; Deal (0-20) Damage";
  } else if (actionInt == 34) {
    return "+10% damage mitigation; Deal (0-20) Damage";
  } else if (actionInt == 35) {
    return "Deal (1-2) Damage for following turns; Deal (0-20) Damage";
  }
  //Item - 4x
  if (actionInt == 40) {
    return "Deal (0-20) Damage";
  } else if (actionInt == 41) {
    return "Deal (5-20) Damage";
  } else if (actionInt == 42) {
    return "-15% enemy damage mitigation; Deal (0-15) Damage";
  } else if (actionInt == 43) {
    return "+15% increased chance to hit enemy; Deal (0-15) Damage";
  } else if (actionInt == 44) {
    return "Deal (5-20) Damage; 5% to deal (10-40) additional damage";
  } else if (actionInt == 45) {
    return "Reflect 20% of incoming damage for following turns";
  } else if (actionInt == 46) {
    return "Deal (10-40) Damage; Ignore enemy Defences";
  }
  //Mouth -5x
  if (actionInt == 50) {
    return "Deal (0-10) Damage";
  } else if (actionInt == 51) {
    return "Deal (0-10) Damage; + 4% to evade attacks";
  } else if (actionInt == 52) {
    return "Deal (0-10) Damage; + 4% to evade attacks";
  } else if (actionInt == 53) {
    return "Deal (1-5) Damage for following turns";
  }
  // Head -6x
  if (actionInt == 60) {
    return "+10% damage mitigation";
  } else if (actionInt == 61) {
    return "ERR 3 RANDOM ACTIONS";
  } else if (actionInt == 62) {
    return "Decrease damage dealt by (1-5) for following turns";
  }
  // Eyes - 7x
  if (actionInt == 70) {
    return "+10% increased chance to hit enemy";
  } else if (actionInt == 71) {
    return "+10% damage mitigation";
  } else if (actionInt == 72) {
    return "-10% enemy damage mitigation";
  } else if (actionInt == 73) {
    return "-10% enemy damage mitigation; Deal (0-5) damage";
  } else if (actionInt == 74) {
    return "+10% chance to evade attacks; +10% increased chance to hit enemy";
  } else if (actionInt == 75) {
    return "+10% increased chance to hit enemy; Deal (0-5) damage";
  } else if (actionInt == 76) {
    return "25% chance to deal double damage for following turns";
  } else if (actionInt == 77) {
    return "Prevent next damage taken";
  }
  // Hat -8x
  if (actionInt == 80) {
    return "Deal (0-5) damage";
  } else if (actionInt == 81) {
    return "+5% to evade attacks";
  } else if (actionInt == 82) {
    return "+10% damage mitigation";
  } else if (actionInt == 83) {
    return "+10% damage mitigation; +5% to evade attacks";
  } else if (actionInt == 84) {
    return "Deal (5-20) damage";
  } else if (actionInt == 85) {
    return "Deal (1-5) damage for following turns";
  } else if (actionInt == 86) {
    return "+10% to evade attacks; 25% to prevent next damage taken";
  } else if (actionInt == 87) {
    return "Deal (2-6) damage for following turns";
  }
}

function showBattleLog() {
    // DELETE ALREADY SHOWING NFTs
    const myNode = document.getElementById("battlelogshow");
    while (myNode.firstChild) {
      myNode.removeChild(myNode.lastChild);
    }
    let battleid = document.getElementById("battlelog").value;
    var contractBattles = new web3.eth.Contract(abibattles, contractIDBattles);
    contractBattles.methods.getBattleLog(battleid).call((err, result) => {
      if (!err) {
        console.log(result);
        var breakline = document.createElement("br");
        var battleLog = document.createElement("p");
        tokenone = Math.floor(result / 10 ** 10);
        dmgone = Math.floor((result / 10 ** 7) % 10 ** 3);
        tokentwo = Math.floor((result / 10 ** 3) % 10 ** 4);
        dmgtwo = result % 10 ** 3;
        console.log(tokenone, dmgone, tokentwo, dmgtwo);
        if (dmgtwo == 999) {
          battleLog.innerHTML = "Token: " + tokenone + " Dealt: " + dmgone + " damage . Token: " + tokentwo + " Killed opponent Skeletoon.";
        }
        if (dmgone == 999) {
          battleLog.innerHTML = "Token: " + tokenone + " Killed opponent Skeletoon. Token: " + tokentwo + " Dealt: " + dmgtwo + " damage.";
        }
        if (dmgone != 999 && dmgtwo != 999 && dmgone >= dmgtwo) {
          battleLog.innerHTML = "Token: " + tokenone + " Dealt: " + dmgone + " damage . Token: " + tokentwo + " Dealt: " + dmgtwo + " damage. Winner token: " + tokenone;
        }
        if (dmgone != 999 && dmgtwo != 999 && dmgone < dmgtwo) {
          battleLog.innerHTML = "Token: " + tokenone + " Dealt: " + dmgone + " damage . Token: " + tokentwo + " Dealt: " + dmgtwo + " damage. Winner token: " + tokentwo;
        }
        document.getElementById("battlelogshow").appendChild(breakline);
        document.getElementById("battlelogshow").appendChild(battleLog);
      } else document.getElementById("battlelogshow").innerHTML = err;
    });
  }