import { useState } from 'react';
import {ethers} from 'ethers';
import voting from '../contracts/voting.json';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';


const useStyles = makeStyles((theme) => ({
 
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin:theme.spacing(1),
  },
}));

function PollForm(){

const classes = useStyles();

const votingAddress = "0xC07dfdDf143E74DE3E2C9c9a49b33251813a06B8";

var cand = [];
var pos = [];




const [candidateNames, setNameOfCandidate] = useState([
  {names: ""}
]);

const [candidatePosition, setPosition] = useState([
  {positions: ""}
]);

const [time, setTime] = useState(0);

const [approveAddress, setAddresses] = useState([
  {address: "", ID: 0 }
])

const handleInputNameChange = (index, event) => {
    const values = [...candidateNames];
    values[index][event.target.name] = event.target.value;
    setNameOfCandidate(values);
}

const handleInputPositionChange = (index, e) => {
  const val = [...candidatePosition];
  val[index][e.target.name] = e.target.value;
  setPosition(val);
}

const handleAddFields = () => {
  setNameOfCandidate([...candidateNames, {names: ""}]);
  setPosition([...candidatePosition, {positions: ""}]);
}

const handleRemoveFields = (index) => {
  const values = [...candidateNames];
  values.splice(index, 1);
  setNameOfCandidate(values);

  const val = [...candidatePosition];
  val.splice(index, 1);
  setPosition(val);
}

const handleSubmit = (e) => {
  e.preventDefault();

  for(var i = 0; i < candidateNames.length; i++){
    cand.push(candidateNames[i].names);
    pos.push(candidatePosition[i].positions);
  }
window.alert("Form submitted, click 'CREATE POLL' to continue")
  
}


const metamask = async () => {
  if(window.ethereum){
    await window.ethereum.request({ method: 'eth_requestAccounts' });
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
      cand, pos, time);
    await transaction.wait();
    window.alert("Poll Created !!");
  }




      return (
      <Container>
        <Button
          className ={classes.button}
          variant = "contained"
          color = "primary"
          type = "metamask"
          onClick = {metamask}>
          Connect Wallet
        </Button>
        
        <form 
        className = {classes.root}
        onSubmit = {handleSubmit}>
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
           
              <IconButton
                onClick = {() => handleRemoveFields(index)}
              >
                <RemoveIcon/>
              </IconButton>

              <IconButton
                onClick = {() => handleAddFields()}
              >
                  <AddIcon/>
              </IconButton>
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

          <Button
            className ={classes.button}
            variant = "contained"
            color = "primary"
            type = "submit"
            endIcon = {<Icon>send</Icon>}
            onClick = {handleSubmit}>
            Submit Form
          </Button>
        </form>

{/* ################################## New form ####################################### */}
        <form className = {classes.root}>
        <h3>Approve Voters</h3>
          <TextField
            name = "address"
            label = "Approve Address"
            variant = "filled"
            value = {approveAddress.address}
          />

          <TextField
            name = "ID"
            label = "Student ID"
            variant = "filled"
            value = {approveAddress.ID}
          />

          <IconButton>
            <RemoveIcon/>
          </IconButton>

          <IconButton>
            <AddIcon/>
          </IconButton>
        </form>

        <Button 
          className ={classes.button}
          variant = "contained"
          color = "primary"
          type = "createPoll"
          endIcon = {<Icon>send</Icon>}
          onClick = {CreatePoll}>
          Create Poll
        </Button>

      </Container>
    );
 
}
export default PollForm
