// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Voting {
    address public owner;
    string public seasonName;
    bool public ongoingSeason = false;

    uint public timeOfDeployment;
    mapping(address => uint) candidateVotes;
    mapping(address => bool) hasVoted;
    mapping(address => bool) candidateAlready;
    mapping(address => bool) voterAlready;

    address[] public candidates;
    address[] public voters;
    address public winners;

    bool public resultDeclared;

    constructor() {
        owner = msg.sender;
    }

    function seasonStatus() public view returns (bool) {
        if (ongoingSeason) {
            return true;
        } else {
            return false;
        }
    }

    function getCandidatesLength() public view returns (uint) {
        return candidates.length;
    }

    function getVoterLength() public view returns (uint) {
        return voters.length;
    }

    function hasVoterVoted() public view returns (bool) {
        return hasVoted[msg.sender];
    }

    function isCandidate() public view returns (bool) {
        return (candidateAlready[msg.sender]);
    }

    function isVoter() public view returns (bool) {
        return (voterAlready[msg.sender]);
    }

    function getCandidateAt(uint index) public view returns (address) {
        require(index < candidates.length, "Index out of bounds");
        return candidates[index];
    }

    function getVoterAt(uint index) public view returns (address) {
        require(index < voters.length, "Index out of bounds");
        return voters[index];
    }

    function newSeason(string memory nameOfSeason) public {
        require(
            ongoingSeason == false,
            "Another season is already going on! Wait for this season to get over"
        );
        require(msg.sender == owner);
        timeOfDeployment = block.timestamp;
        ongoingSeason = true;
        seasonName = nameOfSeason;
    }

    //this function should be called with different addresses.
    function addCandidate() public {
        require(candidateAlready[msg.sender] == false, "Already a candidate!");
        require(
            voterAlready[msg.sender] == false,
            "The address is already participating as a voter!"
        );
        require(
            ongoingSeason == true,
            "There is no season going on, wait till new season is started"
        );
        require(
            block.timestamp <= timeOfDeployment + 300,
            "The time for registering candidates is over!"
        );
        candidates.push(msg.sender);
        candidateAlready[msg.sender] = true;
    }

    function addVoter() public {
        require(voterAlready[msg.sender] == false, "Already a Voter!");
        require(
            candidateAlready[msg.sender] == false,
            "The adress is already participating as a candidate!"
        );
        require(
            ongoingSeason == true,
            "There is no season going on, wait till new season is started"
        );
        require(
            block.timestamp <= timeOfDeployment + 300,
            "The time for registering voter is over!"
        );
        voters.push(msg.sender);
        voterAlready[msg.sender] = true;
    }

    //this function should be automatically called after the time for registeration is complete
    //somehow using javascript, and timer .
    // function beginVoting() public  {
    //     require(block.timestamp>timeOfDeployment+300,"Voter and candidate registerations are still open");
    //     votingStart=true;
    //     timeOfVotingStarted= block.timestamp;
    //     //to be called by javascript
    // }
    function addvote(address candidate) public {
        // require(votingStart=true,"voting not yet started");
        require(hasVoted[msg.sender] == false, "Voter has already voted");
        require(voterAlready[msg.sender], "Voter is not registered!");
        require(candidateAlready[candidate], "Candidate is not registered");
        require(block.timestamp <= timeOfDeployment + 420);
        hasVoted[msg.sender] = true;
        candidateVotes[candidate] += 1;
    }

    function getCandidates() public view returns (address[] memory) {
        require(ongoingSeason, "the season is not started yet");
        return candidates;
    }

    function getResult() public returns (address) {
        require(block.timestamp > timeOfDeployment + 420);
        uint maxxVote = 0;
        for (uint i = 0; i < candidates.length; i++) {
            if (candidateVotes[candidates[i]] > maxxVote) {
                maxxVote = candidateVotes[candidates[i]];
                winners = candidates[i];
            }
        }
        resultDeclared = true;
        return winners;
    }

    // we want the result and endseason to be called by the central server
    // having a address, which will deploy this contract and act as owner. pusedo ownership.

    function endSeason() public {
        require(
            ongoingSeason == true,
            "There is no season going on, wait till new season is started"
        );
        require(resultDeclared, "The results are not yet declared!");

        //reset all variables and all mappings empty
        for (uint i = 0; i < candidates.length; i++) {
            delete candidateVotes[candidates[i]];
            delete candidateAlready[candidates[i]];
        }
        for (uint i = 0; i < voters.length; i++) {
            delete hasVoted[voters[i]];
            delete voterAlready[voters[i]];
        }
        for (uint i = 0; i < candidates.length; i++) {
            delete candidates[i];
        }
        for (uint i = 0; i < voters.length; i++) {
            delete voters[i];
        }
        ongoingSeason = false;
        // votingStart=false;
        timeOfDeployment = 0;
        // timeOfVotingStarted=0;
        resultDeclared = false;
        seasonName = "";
    }
}
