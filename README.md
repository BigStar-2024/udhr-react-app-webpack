# ✅ [Completed] UDHR NFT Minter(For human rights DAO)

This project contains the COMPLETED files for [HRDAO's nft minting page](https://...).
In which we connect your wallet to smart contract through your React dApp project by building an NFT Minter using Metamask and Web3.
And builds bundle.js that can be reused with other templates. In this project bundle.js is used with Webflow.

# 🪜 Installation
To use this minter, you'll need to do the following:

1. Run `npm install` to download the `node_modules` folder.
2. Edit src\util\interact.js file and here edit `apiKey` and `contractAddress`. 
   Here `alchemyKey` is used as `apiKey` and u should replace this with your `apiKey` u used to deploy your smart contract.
   And `contractAddress` is address of deployed smart contract.
   ```
   const alchemyKey = "https://eth-ropsten.alchemyapi.io/v2/...";
   const contractABI = require("../contract-abi.json");
   const contractAddress = "0xDbf2...6D52";
   ```
3. Replace the content `src\contract-abi.json` with your smart contract's `abi.json`. 
4. Run `npm start` in your terminal to open the minter in your browser at http://localhost:3000/.
5. Run `npm webpack-build` in your terminal to make `bundle.js` in your `\dist` directory.
6. Host newly created `bundle.js` on CDN or by publishing it on Github.
7. As this project is interacting with webflow, you should embed element with id is `root` and also include hosted `bundle.js` in it. To include `bundle.js` in your webflow, include it as `<script src = "http://.../bundle.js`></script>` page's before `<body>`.
