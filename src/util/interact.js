const alchemyKey = "https://eth-ropsten.alchemyapi.io/v2/1YEIbZYAJzK5zhtE1BZfOwxuD7NrhCLE";
const contractABI = require("../contract-abi.json");
const contractAddress = "0xDbf2da336dE4119E14162707395EA1351AeC6D52";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

export const udhrContract = new web3.eth.Contract(
  contractABI,
  contractAddress
);

export const loadCurrenctOwner = async () => { 
  const owner = await udhrContract.methods.owner().call(); 
  return owner;
};

export const loadCurrenctTreasury = async () => { 
  const treasury = await udhrContract.methods.treasury().call(); 
  return treasury;
};

export const loadMetadata = async (tokenId) => { 
  const metadata = await udhrContract.methods.nftMetas(tokenId).call();
  return metadata; 
};

export const changeContractOwner = async (address, newOwner) => {
  //input error handling
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your Metamask wallet to update the message on the blockchain.",
    };
  }
  if (newOwner.trim() === "" || web3.utils.isAddress(newOwner)) {
    return {
      status: "❌ New address is not valid",
    };
  }
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: address, // must match user's active address.
    data: udhrContract.methods.transferOwnership(newOwner).encodeABI(),
  };
  //sign the transaction
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      status: (
        <span>
          ✅{" "}
          <a target="_blank" rel="noreferrer" href={`https://ropsten.etherscan.io/tx/${txHash}`}>
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.
        </span>
      ),
    };
  } catch (error) {
    return {
      status: "😥 " + error.message,
    };
  }
}


export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "👆🏽 Press  Mint NFT button to mint a new UDHRNFT.",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Press  Mint NFT button to mint a new UDHRNFT.",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const mintNFT = async (donationAmount) => {

  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    data: udhrContract.methods
      .mintNFT()
      .encodeABI(),
    value: donationAmount.toString(16)
  }; 

  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
        txHash,
    };
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    };
  }
};



