async function main() {
  const CredentialsVault = await hre.ethers.getContractFactory(
    "CredentialsVault"
  );
  const contract = await CredentialsVault.deploy();
  await contract.deployed();
  console.log("Contract address:", await contract.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
