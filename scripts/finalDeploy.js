const  hre = require("hardhat");


async function main (){
    const voting = await hre.ethers.getContractFactory("Voting");
    const contract = await voting.deploy();
    console.log("Address of contract is : ", await contract.getAddress());
    console.log(contract);

}
main().catch((error) => {
    console.error(error);
    process.exit(1); // Exit process with an error code
  });


  //final contract address(no functions called yet : 0x5FbDB2315678afecb367f032d93F642f64180aa3)