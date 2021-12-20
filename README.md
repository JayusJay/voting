Abstract

An electronic voting system that fully mimics real-world systems has long been desired. Until recently, it had not been possible to fully address the mandatory properties of a real-world voting scheme, simultaneously. Recently, with the onset of new technologies and research, however, it is not only possible to fulfill these very properties, but also to improve the anonymity and convenience of voting. A decentralized and self-tallying electronic voting protocol that diminishes centralization is developed in this work and presented in this dissertation. These properties are accomplished through the Ethereum Blockchain. This implementation fulfills most of the security requirements of a real-world voting scheme. Furthermore, this system improves currently in-use e-Voting systems by using a self-tallying protocol. Thus, each voting citizen is able to compute the tally of the election and has complete control over their own vote. The execution of this protocol is enforced using the consensus mechanism that safeguards the Ethereum Blockchain. To prove its feasibility, its implementation was tested on the official Proof of Work (PoW) test network of Ethereum (known as Ropsten). 




Keywords

Blockchain, Ethereum, IPFS, e-Voting Protocols, DApp, Smart Contracts, Metamask, ReactJs, Truffle, Ropsten, Infura, Remix IDE, Material-UI





CHAPTER 1

INTRODUCTION
Voting has always been regarded as the primary method used by individuals to share their opinions on controversial issues and debates. It is a democratic practice, enabling people to formally express their choice against a ballot question, candidate election, political party and others. In every democracy, the security of an election is a matter of national security. With the goal of minimizing the cost of having a national election, while and increasing the security of an election, the computer system has been trying to make electronic voting system more secure. From the dawn of democratically electing candidates, the voting system has been based on pen and paper. The traditional pen and paper election system which fails to provide the voting process traceable and verifiable is replaced by the new election system. Electronic voting system has been viewed as flawed, by the security community, primarily based on physical security concerns. Anyone with physical access to such machine or server can hack or alter the votes, thereby affecting all votes cast on the machine. Blockchain technological features operate through advanced cryptography, providing a security level equal and/or greater than any previously known database. The blockchain technology is therefore considered by many, including me, to be the ideal tool, to be used to create the new modern democratic voting process. Blockchain is gaining attention in several domains, from cryptocurrencies to supply chain management and new financial services (defi). Here I evaluate the use of blockchain as a service to implement an electronic voting (e-voting) system by following original contributions such as research existing blockchain frameworks suited for constructing blockchain based e-voting system, and propose a blockchain-based electronic voting system that enable liquid democracy. The main contributions of blockchain are enforcing voting data immutability and data integrity ensuring robustness and reliability of the voting system, decentralizing the registration and validation mechanisms of voters, transparency, clarity and determinism of the voting environment, public visualization of the smart contracts votes, restricting each voter to have a single vote per valid and privacy-aware regarding the confidentiality of the recorded votes.





1.	BLOCKCHAIN TECHNOLOGY AND ETHEREUM
To solve the problem, I use Blockchain technology which is decentralized, distributed, immutable, irreversible, distribution of joint accounting, asymmetric encryption and provides data-security and integrity. This new technology works through four main features:
a)	The ledger exists in many different locations: No single point of failure in the maintenance of the distributed ledger.
b)	There is distributed control over who can append new transactions to the ledger.
c)	Any proposed “new block” to the ledger must reference the previous version of the ledger, creating an immutable chain from where the blockchain gets its name, and thus preventing tampering with the integrity of previous entries.
d)	A majority of the network nodes must reach a consensus before a proposed new block of entries becomes a permanent part of the ledger. These technological features operate through advanced cryptography, providing a security level equal and/or greater than any previously known database.
Blockchain can be referred to as a public decentralized database with replicates distributed over several nodes simultaneously. In Blockchain there is no authority in charge of managing and maintaining the ledger of transactions. The validity of the ledger’s version is established through a consensus mechanism among the validating nodes. The use of Blockchain technology allows a secure validation of transaction’s data integrity. Bitcoin, for instance, is the first application developed over Blockchain by Satoshi Nakamoto. On another hand, Ethereum Blockchain is an open-source, distributed and decentralized computing infrastructure that executes programs called smart contracts. It is developed to enable decentralization for applications and not only for a digital currency. It is achieved using a virtual machine (Ethereum Virtual Machine, EVM) to execute a Turing complete scripting language called Solidity. Unlike Bitcoin in which only Boolean evaluation of spending conditions are considered, EVM is somehow similar to a general-purpose computer that simulates what a Turing machine can execute. Changing the state of a contract in the Blockchain requires transaction fees which are priced in Ether. Ether is considered as the fuel for operating the distributed application platform.



2.	ETHEREUM ACCOUNTS
There are two types of accounts in Ethereum: 
1) Externally Owned Accounts (EOA): An account identified by a wallet address and controlled by a private key. The holder of this private key can transfer ether and sign transactions from this account. Externally Owned Accounts are considered user type accounts and are linked to unique cryptographic keys pair, generated upon account creation. The public key is used to reference the account and also called EOA address whereas the private key on the other hand is used to sign transaction before executing any type of transaction on the network to prove authenticity. EOAs have balances which hold Ether cryptocurrency.
 2) Smart Contract: A smart contract is an account that is controlled by its own code. It is considered as an autonomous agent executed by the EVM and is the core foundation and the main building blocks of any Decentralized Application. Once this code is deployed on the Blockchain, the EVM will take care of running it as long as the conditions apply. It is important to note that smart contracts once deployed to the Blockchain network, they can be visited and viewed via their address with all their associated transactions (to address, from address, timestamp, block number, etc...). Triggering functions in the smart contract can be performed from any account as long as the following two conditions are met:
 a) Address of the smart contract is known.
 b) The function caller has sufficient Ether to trigger. Smart Contracts provide an important added value: 
The code ruling the business logic is now public (easily verifiable) and not obscure as in conventional servers.















CHAPTER 2
LITERATURE REVIEW

EXISTING SYSTEMS
In today’s world, widespread mistrust towards the government and interference in countries processes by external actors have made the democratic process of voting more critical than ever. People have had their human rights violated and their fundamental freedoms provided by their constitution taken away. In such an atmosphere, having a fair and transparent election is something that is paramount for the freedom most people enjoy today. The pitfalls of the current system of ballot voting are being taken advantage of by people or organizations looking to gain power. The current ballot system does offer anonymity to the voter but the counting process is not transparent. People are supposed to trust the result which is provided by an Election commission or a government body. This makes the process of counting, a major vulnerability in the current process. There are also other major electoral scams such as voter fraud, ballot stuffing and booth capturing. All these make it very difficult for organizers of an election to distinguish between the actual votes and votes added without authorization.


Here are various solutions that attempt to integrate E-voting and Blockchain to enable decentralization of voting services. 

a)	The Future of E-Voting: In their paper entitled “The Future of E-Voting”, Tarasov et. al discussed E-Voting and its potential use with Blockchain. In addition to transparency, privacy, and integrity which became inherent properties of Blockchain Decentralized Applications, this solution proposes a registration phase to verify the users’ identities. Registration is the first step of the protocol, and is required as part of the identity verification for audit purposes. It helps keeping track of which voters have cast a ballot. Although the verification process is done using a Challenge-Response handshake protocol, it involves again a server (Centralized Authority) to handle the verification process and add the users’ data (email addresses) to the database. It is worth mentioning that email addresses are relatively easy to spoof.


b)	Decentralized, Transparent, Trustless Voting on the Ethereum Blockchain: Fernando Lobato Meeser, in his paper entitled “Decentralized, Transparent, Trustless Voting on the Ethereum Blockchain” discusses two types of ongoing issues with E-Voting solutions. First, the capability of anyone to tally the results from the smart contract before having all the votes casted, and second, the anonymity of the votes since public keys can be associated with the recorded votes. In this paper, the author presents the implementation of a voting system as a smart contract running on Ethereum that uses threshold keys and linkable ring signatures. Nevertheless, this solution again includes a registration phase, and voters rely on a Centralized Authority to register their public key for casting a vote.

c)	Vitalik Buterin’s (Ethereum core founder) blog post “Blockchain voting is overrated among uninformed people but underrated among informed people” details the capabilities of a fully distributed voting system using blockchains, how it fits into the democratic governance system and how it could “threaten democracy”. It also highlights solutions to problems like vote coercion and privacy that may arise from the transparency of the blockchain voting system with zero knowledge proofs and obfuscations features still under research.

d)	Patrick McCorry et. al., present the first implementation of a decentralized and self-tallying internet voting protocol. This system is able to retain maximum voting privacy by using the Ethereum Blockchain. Initially crafted by Kiayias and Yung, and later improved by Hao et al., this protocol pioneered the needlessness for a trusted authority in the processes of calculating the tally and protecting the anonymity of a voter. The Open Vote Network is a self-tallying protocol in which the privacy of a vote is controlled by its corresponding voter. Thus, it follows that only a full collusion amongst all the voters would allow for a single vote to be exposed. The execution of this protocol is enforced by the same consensus mechanism that safeguards the Ethereum Blockchain. Their Schnorr non-interactive ZKP and 1 out of 2 ZKP functions to create and verify ZKPs on an Ethereum smart contract have been adopted by this work.








Chapter 3

METHODOLOGY
An electoral system is comprised of a set of rules and protocols that regulate all the facets of the voting process. This section will discuss the voting requirements necessary for an e-Voting system, as well as the particular specifications that an e-Voting system using smart contracts must employ.
1.	E-VOTING SYSTEM REQUIREMENT
Electronic Voting systems seek to improve the conventional electoral system, by modernizing it on par to the cultural and technological advancements. In a traditional electoral setting, the voting process follows a very specific process: 
a)	A list of eligible voters is collected;
b)	The eligibility of the voters is checked, ensuring that only legitimate electors can cast their vote; 
c)	The ballots are collected; 
d)	The tally is calculated by counting the votes. This pattern must be closely matched by its electronic counterpart. Furthermore, according to, a case study on the design and implementation of an e-voting prototype system, the following core properties must be assured:

i.	Accuracy — It must not be possible to alter a vote; 
ii.	Privacy — A voter must not be linked to their vote; 
iii.	Individual and universal verifiability — Any given voter must be able to verify that their vote has been cast correctly, as well as verify that all votes have been counted properly (it may not be possible to entirely fulfill this property in legacy voting systems); 
iv.	Eligibility — The system must only allow eligible voters to vote; and they should only be able to do so once; 
v.	Fairness — The results of an ongoing election must not be disclosed before its end.

The proposed system intends to largely increase the sturdiness and convenience of an electoral process, by achieving the following properties: 
• The system is truly fair — Anyone is able to compute the tally, and only allowed to do so at the end of the elective process. 
• The system is truly accurate — Only a collusion between 51% of the network would allow for votes to be tampered with which is practically very difficult. 
• The system is further mobile — Anyone is able to cast their vote from wherever they are, provided that they own a computer or smartphone and internet connection.
• The robustness and integrity of the system is largely improved — The correct execution of the protocol is enforced by the same network consensus that secures the Ethereum blockchain. 
• The anonymity of the voter is greatly increased — Only a full collusion amidst all the voters would allow for the identity of a single voter to be revealed.

2.	SYSTEM REQUIREMENT AND MODELING
Software system requirements, describes the features and behavior of the application. 
The election is carried out more securely with the help of Ethereum Blockchain where the first phase is creation of election, followed by candidate’s names registration phase, account approval phase, voting phase and the last phase is the voting and result declaration phase is proposed.
The election modules include;
a)	Administrator or election officer is accountable to set up the initial registration phase and also responsible for creating smart contracts. The administrator has the capability to grant and maintain voting permission to voters.
Fig. 1 The Election process.
a)	React web application.
The React web application provides an interface to interact with the smart contract. It allows anyone to create a poll and authenticate users to participate in that poll. The election officer adds the candidate list and then initiates an API request to Infura which provides an interface to communicate with the Ethereum blockchain without having to run a full node. As the voting process takes place in the Ethereum network, it is mandatory to have an interface connecting the web application to the Blockchain network. Therefore, a Metamask wallet browser extension is needed to sign transactions to the blockchain. All transactions transmitted from the web application are sent to the Blockchain network through the Infura API.

b)	PollForm.js
This is the ReactJs component that manages the creation of ballots and authentication of voter addresses to participate in the election. It handles the time and various input needed to create a poll on the blockchain.
c)	PollList.js
This is the ReactJs component that handles data retrieval from the blockchain as well as enabling whitelisted address to be able to cast votes and view details of candidates.
d)	IPFS.
The InterPlanetary File System plays the role of hosting the frontend React application on a distributed file sharing network. This allows voters anywhere around the world to cast their votes and also ensures the frontend is censorship resistant just as the smart contract. 
e)	Voting.sol is the smart contract file.  This is eventually deployed to Ethereum’s Ropsten Testnet to mimic an actual smart contract on the Ethereum mainnet. It carries out the voting logic and ensures all voting parameters are met and well executed. 

Fig. 2 Dataflow diagram of E-voting system.
f)	Metamask.
Metamask is an Ethereum wallet that has a browser extension version for accessing Ethereum enabled distributed applications, or "Dapps" in your browser. The extension injects the Ethereum web3 API into every website's JavaScript context, so that dapps can read from the blockchain. MetaMask also lets the user create and manage their own identities via private keys, so when a Dapp wants to perform a transaction and write to the blockchain, the user gets a secure interface to review the transaction, before approving or rejecting it.





3.	ADDING CANDIDATES
The Administrator uses the web application discussed previously to create a new voting event by adding the candidates. The Administrator is requested to add the candidate through the web. Technically, creating a voting event means creating a voting contract on the Blockchain. Therefore, this transaction must be charged for the administrator as transactions cost in Ethereum. After securing the transaction cost, the web app deploys the contract to Ethereum the network. The address of the newly created smart contract will be returned to the administrator.
4.	VOTING
While Voting is initiated, the application calls the Vote (address _address, uint option) method of the designated smart contract deployed on the EVM. Next, the voting contract checks the array of allowed voters to know if the user is already existed. Then, it checks if the user already voted or the event is finished. If the conditions are satisfied, the contract increments the count of the selected option, marks the user as voted, and takes it to the end page. The contract automatically rejects duplicate votes, allowing to restrict one vote per user. This is considered the major advantage of our system compared to the others.












Chapter 4

IMPLEMENTATIOIN AND RESULTS
To validate the proposed system, the solution was implemented using various technologies.
a.	Solidity, an object-oriented programming language for writing the voting smart contract.
b.	NodeJS for handling server-side events and installation of dependencies during development.
c.	Truffle as a blockchain framework to make the process of compiling and deploying smart contracts easier.
d.	ethersJS library to interface the frontend with the smart contract’s Application Binary Interface (ABI). 
e.	ReactJS along with Material-UI for the frontend user interface and design. 
f.	JavaScript for the backend and frontend interface to manage the voting process and programming logic. 
g.	The Ropsten Testnet is used to simulate the Ethereum mainnet Blockchain network. It is worth noting the user has to acquire some Ropsten Testnet Ether from a faucet in order to be able to use the application. 
h.	Metamask for initiating and signing the transactions to the Blockchain. 
i.	IPFS for hosting the decentralized website online.



Fig. 3   Poll creation.


Fig. 4   Address approval by Election officer. 

Fig. 5   A voter casts his ballot.


Fig. 6   The winner revealed after voting has ended.

Chapter 5

CONCLUSION, RECOMMENDATIONS AND FUTURE WORK
This paper proposed a decentralized voting platform based on Ethereum Blockchain. This idea of adapting digital voting systems to make the public electoral process cheaper, faster and easier, is a compelling one in modern society. It also opens the door for a more direct form of democracy, allowing voters to vote from any part of the world through internet and can monitor that their vote has been counted. Blockchain technology offers a new possibility for democratic countries to advance from the pen and paper election scheme, to a more cost- and time-efficient election scheme, while increasing the security measures of the today’s scheme and offer new possibilities of transparency and guarantee that each individual voter’s vote is counted from the correct district, which could potentially increase voter turnout. 
This system could be developed further to make it more eligible for on campus university elections and national government elections, based on fingerprint authentication, using Artificial intelligence for facial and single user authentication and by using upcoming technologies for the easy, better and secured voting.
There is lots of research into decentralized voting with blockchain. This proof of concept could be built out to support a moderate number of participants to hold a valid election which will be completely free and fair. Attempting to hack it is impractical with current technologies since it will mean hacking the decentralized Ethereum blockchain.











REFERENCES
1.	Vitalik Buterin, “Blockchain voting is overrated among uninformed people but underrated among informed people”. https://vitalik.ca/general/2021/05/25/voting2.html
2.	Gavin Wood, “Ethereum: A secure decentralized generalized transaction ledger,” Ethereum project yellow paper, vol. 151, pp. 1–32, 2014
3.	Infura API, “Infura docs”, https://infura.io/docs
4.	V. Buterin et al., “A next-generation smart contract and decentralized application platform,” white paper, 2014.
5.	A. K. Koc. and U. C. C. abuk, “Towards secure e-voting using ethereum blockchain.”
6.	Jihad Fraij, Ashraf Aldabbas and Nemer Aburumman, “Blockchain as an e-voting tool”
7.	Fatrah, A., El Kafhali, S., Haqiq, A. and Salah, K.: “Proof of concept blockchain based voting system”. In: Proceedings of the 4th International Conference on Big Data and Internet of Things BDIoT 2019, Article No. 31, pp. 1–5, October 2019. https://doi.org/10.1145/3372938.3372969
8.	Solidity by example, https://docs.soliditylang.org/en/v0.8.0/solidity-by-example.html
9.	Aicha Fatrah, Said El Kafhali1, Khaled Salah, and Abdelkrim Haqiq, “Transparent Blockchain-Based Voting System: Guide to Massive Deployments”.
10.	Metamask, https://metamask.io/
11.	Ropsten, https://ropsten.etherscan.io/
12.	Truffle framework, https://www.trufflesuite.com/truffle
13.	Ethereum Remix IDE, https://remix.ethereum.org/
14.	IPFS, https://ipfs.io/
