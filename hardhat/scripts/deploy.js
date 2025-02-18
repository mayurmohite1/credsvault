const { ethers } = require("hardhat");

async function main() {
  const CredentialsVault = await ethers.getContractFactory("CredentialsVault");

  const contract = await CredentialsVault.deploy();
  await contract.waitForDeployment();
  console.log("Contract address:", await contract.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
