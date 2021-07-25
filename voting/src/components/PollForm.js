import { useState } from 'react'
import { ethers } from 'ethers'
import voting from '../contracts/voting.json'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'
import Icon from '@material-ui/core/Icon'

//styling
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}))

function PollForm() {
  const classes = useStyles()

  const votingAddress = '0xC07dfdDf143E74DE3E2C9c9a49b33251813a06B8'

  var cand = []
  var pos = []
  var add = []
  var IDs = []
  var IDsNo = []

  //handling data input in arrays
  const [candidateNames, setNameOfCandidate] = useState([{ names: '' }])

  const [candidatePosition, setPosition] = useState([{ positions: '' }])

  const [time, setTime] = useState(0)

  const [approveAddress, setAddresses] = useState([{ address: '' }])

  const [approveID, setID] = useState([{ ID: 0 }])

  const [errors, setErrors] = useState({ help: null })
  const [positionErrors, setPositionErrors] = useState({ help: null })

  ////Candidates name and positions change handlers
  const handleInputNameChange = (index, event) => {
    const values = [...candidateNames]
    values[index][event.target.name] = event.target.value
    setNameOfCandidate(values)

    setErrors({ help: '' })
    let reg = new RegExp(/[a-zA-Z]+/g).test(event.target.value)
    if (!reg) {
      setErrors({ help: 'Enter a valid name' })
    }
  }

  const handleInputPositionChange = (index, e) => {
    const val = [...candidatePosition]
    val[index][e.target.name] = e.target.value
    setPosition(val)

    setPositionErrors({ help: '' })
    let reg = new RegExp(/[a-zA-Z]+/g).test(e.target.value)
    if (!reg) {
      setPositionErrors({ help: 'Enter a valid Position Title' })
    }
  }
  ////Addresses and IDs change handlers
  const handleAddressChange = (index, e) => {
    const val = [...approveAddress]
    val[index][e.target.name] = e.target.value
    setAddresses(val)
  }

  const handleIDChange = (index, e) => {
    const val = [...approveID]
    val[index][e.target.name] = e.target.value
    setID(val)
  }
  ////Inreament of candidates and position fields handler
  const handleAddFields = () => {
    setNameOfCandidate([...candidateNames, { names: '' }])
    setPosition([...candidatePosition, { positions: '' }])
  }
  ////Decreament of Candidates and postion fields handler
  const handleRemoveFields = (index) => {
    const values = [...candidateNames]
    values.splice(index, 1)
    setNameOfCandidate(values)

    const val = [...candidatePosition]
    val.splice(index, 1)
    setPosition(val)
  }
  ////Increase of Addresses and IDs field handler
  const handleAddAddress = () => {
    setAddresses([...approveAddress, { address: '' }])
    setID([...approveID, { ID: 0 }])
  }
  ////Decreament of  Addresses and IDs field handler
  const handleRemoveAddress = (index) => {
    const value = [...approveAddress]
    value.splice(index, 1)
    setAddresses(value)

    const val = [...approveID]
    val.splice(index, 1)
    setID(val)
  }
  ////Candidates names and positions submission handler
  const handleSubmit = (e) => {
    e.preventDefault()

    for (var i = 0; i < candidateNames.length; i++) {
      cand.push(candidateNames[i].names)
      pos.push(candidatePosition[i].positions)
    }
    window.alert("Form submitted, click 'CREATE POLL' to continue")
    console.log('names: ', cand)
    console.log('positions: ', pos)
  }
  ////Address and IDs submission handler
  const handleAddressSubmit = (e) => {
    e.preventDefault()
    for (var i = 0; i < approveAddress.length; i++) {
      add.push(approveAddress[i].address)
      IDs.push(approveID[i].ID)
    }
    IDsNo = IDs.map((i) => Number(i))
    window.alert(
      "Addresses and IDs Submitted, proceed to click 'CONFIRM ADDRESSES'",
    )
    console.log('address: ', add)
    console.log('IDs: ', IDs)
    console.log('IDsNo: ', IDsNo)
  }

  ////Metamask button handler
  const metamask = async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' })
    } else {
      window.alert('please install metamask')
    }
  }
  ////requesting user account from metamask
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
  }
  ////sending create poll function to smart contract
  async function CreatePoll() {
    await requestAccount()
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(votingAddress, voting.abi, signer)
    const transaction = await new contract.createPoll(cand, pos, time)
    await transaction.wait()
    window.alert('Poll Created !!')
  }
  ////sending approve voters function to smart contract
  async function ApproveVoters() {
    await requestAccount()
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(votingAddress, voting.abi, signer)
    const transaction = await new contract.approveVoters(add, IDsNo)
    await transaction.wait()
    console.log(add, 'Addresses Approved')
  }

  return (
    <Container>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        type="metamask"
        onClick={metamask}
      >
        Connect Wallet
      </Button>

      <form className={classes.root} onSubmit={handleSubmit}>
        <h3>Create a Poll</h3>
        {candidateNames.map((candidateName, index) => (
          <div key={index}>
            <TextField
              name="names"
              label="Name of Candidates"
              variant="filled"
              onChange={(event) => handleInputNameChange(index, event)}
              value={candidateName.names}
              required
              type="text"
              error={Boolean(errors?.help)}
              helperText={errors?.help}
            />

            <IconButton onClick={() => handleRemoveFields(index)}>
              <RemoveIcon />
            </IconButton>

            <IconButton onClick={() => handleAddFields()}>
              <AddIcon />
            </IconButton>
          </div>
        ))}

        {candidatePosition.map((position, index) => (
          <div key={index}>
            <TextField
              name="positions"
              label="Position of Candidates"
              type="text"
              variant="filled"
              required
              onChange={(e) => handleInputPositionChange(index, e)}
              value={position.positions}
              error={Boolean(positionErrors?.help)}
              helperText={positionErrors?.help}
            />
          </div>
        ))}

        <TextField
          type="number"
          label="Time in secs"
          onChange={(e) => setTime(e.target.value)}
          value={time}
          variant="filled"
        />

        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
          endIcon={<Icon>send</Icon>}
          onClick={handleSubmit}
        >
          Submit Form
        </Button>
      </form>

      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        type="createPoll"
        endIcon={<Icon>send</Icon>}
        onClick={CreatePoll}
      >
        Create Poll
      </Button>

      {/* ################################## New form ####################################### */}
      <h3>Approve Voters</h3>
      <form className={classes.root}>
        {approveAddress.map((approveAddress, index) => (
          <div key={index}>
            <TextField
              name="address"
              label="Approve Address"
              variant="filled"
              onChange={(e) => handleAddressChange(index, e)}
              value={approveAddress.address}
            />

            <IconButton onClick={() => handleRemoveAddress(index)}>
              <RemoveIcon />
            </IconButton>

            <IconButton onClick={() => handleAddAddress()}>
              <AddIcon />
            </IconButton>
          </div>
        ))}

        {approveID.map((approveID, index) => (
          <div key={index}>
            <TextField
              name="ID"
              label="Student ID"
              type="number"
              variant="filled"
              onChange={(e) => handleIDChange(index, e)}
              value={approveID.ID}
            />
          </div>
        ))}

        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          endIcon={<Icon>send</Icon>}
          onClick={handleAddressSubmit}
        >
          Submit Form
        </Button>
      </form>

      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        type="approveVoters"
        endIcon={<Icon>send</Icon>}
        onClick={ApproveVoters}
      >
        Confirm Addresses
      </Button>
    </Container>
  )
}
export default PollForm
