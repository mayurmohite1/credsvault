const { ethers } = require("hardhat");

async function main() {
  const CredentialsVault = await ethers.getContractFactory("CredentialsVault");

  // Start deployment, returning a promise that resolves to a contract object
  const contract = await CredentialsVault.deploy();
  await contract.waitForDeployment(); // Ensure the contract is deployed before logging the address
  console.log("Contract address:", await contract.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
