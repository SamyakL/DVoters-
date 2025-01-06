# Instructions to run this proect

This project demonstrates a basic decentralised votin dapp use case. The smart contract written in solidity, allows registeration of candidates, voters, and starting mvoting campaign. The Dapp allows anyone to start a voting campaign season. Once a voting campiagn is started, for the next 5mins, voter and candidate registerations are open. And from the time of start of a voting campaign till next 7 minutes, votes can be given. Only after this 7 minutes have been passed, the results, can be fethced by anyone.
this timings can be changed, in the contract.

To run this dapp, run the following :
Goto the project folder and run
```
npm install
```

In the project folder, update the hardhat.config.js file to your suited testnet. By default it uses sepolia testnet, the configarations of which are stored a.env file.

Next step is to deploy the contract.  
run
```
npx hardhat run --network scripts/finalDeploy.js

```

This will deploy and print the contract address, copy this address and update the contractAddreess variable in App.jsx in client folder.

Now in a new terminal in the client folder
run
```
npm run dev

```
The dapplication is ready to use.

