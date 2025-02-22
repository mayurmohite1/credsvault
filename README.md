
# Project's Title

                                CredsVault A Blockchain Solution To Store Credentials📝🙈




## Project's Description

Experience unprecedented security for your sensitive credentials through advanced blockchain encryption. CredsVault combines encryption with the power of decentralized storage to ensure your data remains private, secure, and accessible only to you 😒❌
## Features

- Uncompromising Digital Security ✅
- Advanced Encryption Protocol ✅
- Tamper-Proof Storage ✅
- Store Credentials ✅
- View Credentials ✅
- Edit Credentials ✅
- Responsive Web Design ✅


## Tech Stack

**Client:** React, TailwindCSS.

**Backend:** Hardhat, Ethers.js, Soldity.

**Library/Frameworks:** Renown, Shadcn, luicide-react.


## Installation

Step 1: Git clone the repository.

Step 2: First move to credsvault folder and run the following command. After that move to hardhat folder and run the following command.

```bash
npm install 
```
Step 3: Setup the environment variables.    

Step 4: Move to the hardhat folder and run the following command.

```bash
npx hardhat compile
```

Step 5: After successful compilation copy the ABI from the artifacts/contracts/CredentialsVault.json file and paste it in the src/pages/contractConfig.ts file.

Step 6: Get some sepolia faucet from the following the link.

```bash
https://sepolia-faucet.pk910.de/
```

Step 7: Move to the hardhat folder and deploy the contract on the sepolia testnet using the following command.

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

Step 8: After deploying you will get a contract deloyment address copy that address in the root .env file. For eg: VITE_CONTRACT_ADDRESS=0xdDxxxx......


## Environment Variables

To run this project, you will need to create two .env files one at the root folder and other inside hardhat folder add the following environment variables to your 👉.env 👈 file. 

credsvault/.env 

`VITE_PROJECT_ID` --> Create your VITE_PROJECT_ID by creating project on this link https://cloud.reown.com/sign-in. For eg: VITE_PROJECT_ID=0d2a9xxxxxxx....

`VITE_CONTRACT_ADDRESS` --> After following the installation process you will get a Contract Address add it here. For eg: VITE_CONTRACT_ADDRESS=0xdDxxxx......

hardhat/.env

`API_URL` --> Create your API_URL by creating new API key by using this link https://developer.metamask.io/login. After that click on Configure and checkbox on mainnet and sepolia for Ethereum. For eg: API_URL=aab9xxxxx.....

`PRIVATE_KEY` --> Add your metamask wallet private key. For eg: PRIVATE_KEY=xxxxxx....


## Deployment

To deploy this project run the following command from the credsvault folder.

```bash
npm run dev
```


## Screenshots




## Documentation

[React](https://react.dev/learn)

[Javascript](https://javascript.info/)

[Solidity](https://docs.soliditylang.org/en/latest/)

[Ethers.js](https://docs.ethers.org/v5/)

[Hardhat](https://hardhat.org/docs)

[TailwindCSS](https://v2.tailwindcss.com/docs)

[Renown](https://docs.reown.com/appkit/overview)

[luicide-react](https://lucide.dev/guide/packages/lucide-react)


## Appendix

If you get an error like this. 
```
Invalid account: #0 for network: sepolia - private key too short, expected 32 bytes
```
Please add the private key directly in the hardhat.config.js file.
For eg:

```
sepolia: {
      url: `https://sepolia.infura.io/v3/${API_URL}`,
      accounts: [`0x.............`,],
    },
```
