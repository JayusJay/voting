import { useState } from 'react'
import { ethers } from 'ethers'
import voting from '../contracts/voting'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
// import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
// import FormLabel from '@material-ui/core/FormLabel'

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

const votingAddress = '0xca16B991467583f107C054d376Cd68C91FFBF767'
var candidateDetail = []
var vying

function PollList() {
  const classes = useStyles()
  // const [candi, setCandi] = useState([])
  const [value, setValue] = useState('')
  const [disable, setDisable] = useState(false)
  const [disableMetamask, setDisableMetamask] = useState(false)

  const metamask = async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' })
    } else {
      window.alert('please install metamask')
    }
    setDisableMetamask(true)
  }
  ////requesting user account from metamask
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
  }

  async function candidates() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(votingAddress, voting.abi, provider)
      try {
        const _candidates = await contract.showCandidates()
        for (var i = 0; i < _candidates.length; i++) {
          candidateDetail.push(_candidates[i].name)
          }
          vying = _candidates[0].vyingPosition
        // setCandi(candidateDetail)

         console.log("positions: ", vying)

        // console.log('data 0', _candidates[0])
        console.log('candidate details', candidateDetail)
      } catch (err) {
        console.log('Error: ', err)
      }
      // console.log('candi', candi)
    }
    setDisable(true)
  }
// radio button change handler
  const handleChange = (event) => {
    setValue(event.target.value)
  }
  console.log('valu ', value)
  return (
    <Container>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        type="metamask"
        onClick={metamask}
        disabled = {disableMetamask}
      >
        Connect Wallet
      </Button>
      <h2>Available Polls </h2>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        type="candidates"
        onClick={candidates}
        disabled = {disable}
      >
        View Candidates
      </Button>
 
 <h4>{vying}</h4>
      {candidateDetail.map((name, index) => (
        <div key={index}>
          <FormControl component="fieldset">
            {/* <FormLabel component="legend">Candidates</FormLabel> */}
            <RadioGroup
              value={value}
              aria-label="Candidates"
              name="candidates"
              onChange={handleChange}
            >
              <FormControlLabel
                value={index.toString()}
                control={<Radio />}
                label={name}
              />
            </RadioGroup>
          </FormControl>
        </div>
      ))}
    </Container>
  )
}
export default PollList
