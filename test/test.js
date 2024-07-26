const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");

const {anyValue} =require("@nomicfoundation/hardhat-chai-matchers/withArgs");

const {expect} = require("chai");
const hre = require("hardhat");

describe ("Voting", function(){
    async function deployLockFixture (){
        const voting = await hre.ethers.getContractFactory("Voting");
        const contract = await voting.deploy();
        const signers =await hre.ethers.getSigners();
        return {contract,signers};
    }

    describe('getCandiLen', () => { 
        it("should get candidates[] length", async()=>{
            const {contract,signers} = await loadFixture(deployLockFixture);
            
            try {
                // await contract.addCandidate("name1",20);
                const leng = await contract.getCandidatesLength()
            console.log("the length of the candidates[]:",leng.toNumber());
            expect(leng >=0);
            } catch (error) {
                console.log("eorrro aya bhai :",error);
            }
        })
     })
    //testing the ownership of the contract.
    // describe("testOwner",()=>{
    //     it("should match the owner to deployer", async()=>{
    //         const {contract,signers} = await loadFixture(deployLockFixture);
    //         expectedOwner = await contract.owner();
    //         firstAddress = await signers[0].getAddress();
    //         //assert thet the contract owner is the first signer
    //         expect(expectedOwner).to.equal(firstAddress);
    //     });
    // })
    //testing the new season function.
    // describe("new Season",()=>{
    //     it("should set onsgoing season to true",async()=>{
    //         const {contract,signers} = await loadFixture(deployLockFixture);
    //         await contract.newSeason();
    //         const newSeason = await contract.ongoingSeason();
    //         //assert that newSeasson() starts a new voting season and set ongoingSeason to true
    //         expect(newSeason).to.equal(true);

    //     })
    // })
    //testing the addCandidate function
    // describe("Add candidates",()=>{
    //     it("should add candidates to candidates[]", async()=>{
    //         const {contract,signers} = await loadFixture(deployLockFixture);
    //         await contract.newSeason();
    //         const cand1 = signers[1];
    //         await contract.connect(cand1);
    //         await contract.addCandidate();

    //         //now assert that candi1 is added to the candidate[]
    //         const iscandi = await contract.isCandidate();
    //         expect(iscandi).to.equal(true);

    //     });
    // })

    // describe("Add voters", () => {
    //     it("should add voter to the voters[]", async()=>{
    //         const {contract,signers} = await loadFixture(deployLockFixture);
    //         await contract.newSeason();
    //         const voter1 = signers[10];
    //         await contract.connect(voter1);
    //         await contract.addVoter();

    //         //now assert that candi1 is added to the candidate[]
    //         const isvoter = await contract.isVoter();
    //         expect(isvoter).to.equal(true);
    //     })
    // })

    //now testing beginVoting() which should be START ONLY AFTER 120 SEC after the candidate
    //and voter registerations begins.

    // describe("Begin Voting, add votes", ()=>{
    //     it("should set votingStart to true only after 2 mins of registrations and candidates and voters.", function (done) {
    //         this.timeout(150000); // Set the timeout to 150 seconds for this test
    //         loadFixture(deployLockFixture).then(async ({ contract, signers }) => {
    //             await contract.newSeason();
    //             await contract.removeCandis();

    //             function delay(ms) {
    //                 return new Promise(resolve => setTimeout(resolve, ms));
    //             }
    //             const candi1 = signers[18].getAddress();
    //             await contract.connect(candi1);
    //             await contract.addCandidate();

    //             const candi2 = signers[16].getAddress();
    //             await contract.connect(candi2);
    //             await contract.addCandidate();

    //             const voter1 = signers[15].getAddress();
    //             await contract.connect(voter1);
    //             await contract.addVoter();

    //             const voter2 = signers[13].getAddress();
    //             await contract.connect(voter2);
    //             await contract.addVoter();
    //             console.log("Waiting for 2 minutes...");
    //             await delay(130000); // Wait for 2 minutes (130000 ms for extra buffer)
    //             console.log("2 minutes have passed, executing code now.");
                
    //             await contract.connect(signers[0]).beginVoting();

    //             await contract.connect(voter1);
    //             await contract.addVote(candi1);

    //             await contract.connect(voter2);
    //             await contract.addVote(candi1);

    //             //assert that voter1&2 has voted by checing hasvoted  is true for both of them
    //             //checking for voter2
    //             const voter2HasVoted = await contract.hasVoterVoted()
    //             //now checking for voter1
    //             await contract.connect(voter1);
    //             const voter1HasVoted = await contract.hasVoterVoted()

    //             expect(voter1HasVoted,voter2HasVoted).to.equal(true);



                




                
    //             done(); // Signal to Mocha that the test is complete
    //         }).catch(done); 

    //     });
    // })

    







 });
