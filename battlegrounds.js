window.onload = function () {
  console.log("Client-side code running");
  //Summon enemy Skeletoon

  document.getElementById("connect wallet").onclick = function connect() {
    connectWallet();
  };

  document.getElementById("battlebutton").onclick = function show() {
    showBattleLog();
  };

  document.getElementById("registertoken").onclick = function show() {
    registerSkeletoon();
  };

  document.getElementById("removetoken").onclick = function show() {
    removeFromBattleGrounds();
  };
};
var walletID = "x";
var theTransactionHash = "";


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
