import { useState } from 'react';
import Web3 from 'web3';
import {ethers} from 'ethers';
import voting from '../contracts/voting.json';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
//import {makeStyles} from '@material-ui/core/styles';

//let metaconnect = false;

function PollForm(){

const votingAddress = "0x5ffbbF196922c73dF9A50a6Bf7729BF8853D4EF4";



const [candidateNames, setNameOfCandidate] = useState([
  {names: ""}
]);

const [candidatePosition, setPosition] = useState([
  {positions: ""}
]);

const [time, setTime] = useState(0);

const handleInputNameChange = (index, event) => {
    const values = [...candidateNames];
    values[index][event.target.name] = event.target.value;
    setNameOfCandidate(values);
}

const handleInputPositionChange = (index, e) => {
  const values = [...candidatePosition];
  values[index][e.target.name] = e.target.value;
  setPosition(values);
}

// let arr = ["Jayus", "Jay"]
// var arr1 = ["Presi", "dent"]
// var clock = 300;

const metamask = async () => {
  if(window.ethereum){
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      //  const account = accounts[0];
      
      //  console.log(account);
      // metaconnect = true;
  }
  else {
    window.alert("please install metamask");
  }
  
}

async function requestAccount(){
  await window.ethereum.request({method: 'eth_requestAccounts'});
}

  async function CreatePoll(){
    

    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(votingAddress, voting.abi, signer);
    const transaction = await new contract.createPoll(
      candidateNames, candidatePosition, time);
    await transaction.wait();
    console.log("Poll created");
  }




      return (
      <Container>
        <button onClick = {metamask}> Connect Wallet</button>
        <form>
          <h3>Create a Poll</h3>
          {candidateNames.map((candidateName, index) => (
            <div key = {index}>
              <TextField 
              name = "names"
              label ="Name of Candidates"
              variant = "filled"
              onChange ={event => handleInputNameChange(index, event)}
              value = {candidateName.names}
              />
         
            </div>
          ))}
              
          {candidatePosition.map((position, index)=>(
            <div key = {index}>
              <TextField 
              name = "positions"
              label ="Position of Candidates"
              variant = "filled"
              onChange ={e => handleInputPositionChange(index, e)}
              value = {position.positions}

              />  
            </div>
          ))}

        <TextField 
        onChange = {e => setTime(e.target.value)}
        label = "Time in secs" value = {time}
        variant = "filled" />

        </form>

        <button onClick = {CreatePoll}>Create Poll</button>

    


        {/* <input onChange = {e => setNameOfCandidate(e.target.value)}
        placeholder = "[Name of Candidates]" value = {candidateName}/> */}    
        {/* <input onChange = {e => setPosition(e.target.value)}
        placeholder = "[Positions]" value = {position}/> */}


      </Container>
    );
 
}
export default PollForm
