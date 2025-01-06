import React, { useState, useEffect } from 'react';
import Candi from './Candi';

function Candidates({ state }) {
  const { signerAddress, contract: contractInstance } = state;

  const [candidateLength, setCandidateLength] = useState('0');
  const [voterLength, setVoterLength] = useState('0');
  const [candidatesArray, setCandidatesArray] = useState([]);
  const [votersArray, setVotersArray] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [winner, setWinner] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const candis = await contractInstance.getCandidatesLength();
        setCandidateLength(candis.toString());

        const votis = await contractInstance.getVoterLength();
        setVoterLength(votis.toString());

        const candidates = [];
        for (let i = 0; i < candis; i++) {
          const candidate = await contractInstance.getCandidateAt(i);
          candidates.push(candidate.toString());
        }
        setCandidatesArray(candidates);

        const voters = [];
        for (let j = 0; j < votis; j++) {
          const voter = await contractInstance.getVoterAt(j);
          voters.push(voter.toString());
        }
        setVotersArray(voters);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [contractInstance]);

  async function addCandi() {
    try {
      await contractInstance.connect(signerAddress);
      const tx = await contractInstance.addCandidate();
      await tx.wait();
      // Refresh candidates after adding
      fetchData();
    } catch (error) {
      console.error("Error adding candidate:", error);
      //alert("Already a candidate or time is up for registrations!");
    }
  }

  async function addVoti() {
    try {
      await contractInstance.connect(signerAddress);
      const tx = await contractInstance.addVoter();
      await tx.wait();
      // Refresh voters after adding
      fetchData();
    } catch (error) {
      console.error("Error adding voter:", error);
      //alert("Already a voter or time is up for registrations!");
    }
  }

  async function addVote(event) {
    event.preventDefault();
    try {
      await contractInstance.connect(signerAddress);
      const tx = await contractInstance.addvote(inputValue.toString());
      await tx.wait();
      console.log("Vote added successfully!");

      setInputValue('');
    } catch (error) {
      console.error("Error adding vote:", error);
    }
  }

  async function results() {
    try {
      await contractInstance.connect(signerAddress);
      const tx = await contractInstance.getResult();
      tx.wait();
      setWinner(await contractInstance.winners())
      console.log("Winner is:", winner);
      alert("The Winner is " + winner + "!!");
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  }

  return (
    <div>
      <div className='campDetails'>
        <div className='candidates'>
          {candidateLength === '0' ? (
            <div>
              <h3>No candidates registered yet!</h3>
              <button onClick={addCandi}>Click here to register yourself as a candidate</button>
            </div>
          ) : (
            <div>
              <h3>Candidates registered: {candidateLength}</h3>
              <ul>
                {candidatesArray.map((candidate, index) => (
                  <Candi key={index} candi={candidate} />
                ))}
              </ul>
              <button onClick={addCandi}>Click here to register yourself as a candidate</button>
            </div>
          )}
        </div>
        <div className='voters'>
          {voterLength === '0' ? (
            <div>
              <h3>No Voters registered yet!</h3>
              <button onClick={addVoti}>Click here to register yourself as a voter</button>
            </div>
          ) : (
            <div>
              <h3>Voters registered: {voterLength}</h3>
              <ul>
                {votersArray.map((voter, index) => (
                  <Candi key={index} candi={voter} />
                ))}
              </ul>
              <button onClick={addVoti}>Click here to register yourself as a voter</button>
            </div>
          )}
        </div>
      </div>
      <div className='vote'>
        <form onSubmit={addVote}>
          <label style={{ paddingRight: 20, paddingLeft: 5 }}>Cast your Vote!</label>
          <input
            type='text'
            placeholder='Address of candidate'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}

          />
          <button type='submit'>Vote!</button>
        </form>
      </div>
      <div className='result'>
        <button className='resButton' onClick={results}>See results!</button>
      </div>
    </div>
  );
}

export default Candidates;
