const  hre = require("hardhat");

async function main (){
    const voting = await hre.ethers.getContractFactory("Voting");
    const contract = await voting.deploy();
    console.log("Address of contract is : ", await contract.getAddress());

}
main().catch((error) => {
    console.error(error);
    process.exit(1); // Exit process with an error code
  });







