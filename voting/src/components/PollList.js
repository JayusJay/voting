import { useState } from 'react'
import { ethers } from 'ethers'
import voting from '../contracts/voting'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import { Grid, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
  list: {
    margin: 0,
    padding: 11,
  },
}))

const votingAddress = '0xca16B991467583f107C054d376Cd68C91FFBF767'
var candidateDetail = []
var vying = []

function PollList() {
  const classes = useStyles()
  const [value, setValue] = useState('')
  const [disable, setDisable] = useState(false)
  const [disable1, setDisable1] = useState(true)
  const [disableMetamask, setDisableMetamask] = useState(false)
  const [visibility, setVisibility] = useState(false)
  const [gridVisibility, setGridVisibility] = useState(false)
  const [winn, setWinn] = useState([
    {
      name: '',
      position: '',
    },
  ])

  const metamask = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
      } else {
        window.alert('please install metamask')
      }
      setDisableMetamask(true)
    } catch (err) {
      window.alert('Please connect wallet to continue')
    }
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
          vying.push(_candidates[i].vyingPosition)
        }
      } catch (err) {
        window.alert('Error: ', err)
      }
    }
    setDisable(true)
    setGridVisibility(true)
  }

  async function Vote() {
    if (typeof window.ethereum !== 'undefined') {
      const address = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      const address1 = address[0]
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(votingAddress, voting.abi, signer)
      try {
        const transaction = await new contract.castVote(address1, value)
        await transaction.wait()
      } catch (err) {
        window.alert(err.data.message)
      }
    }
  }

  async function Winner() {
    await requestAccount()
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(votingAddress, voting.abi, provider)
    const winner = await contract.winnerName()

    setWinn([{ name: winner[0], position: winner[1] }])
    setVisibility(true)
  }

  // radio button change handler
  const handleChange = (event) => {
    setValue(event.target.value)
    setDisable1(false)
  }
console.log(process.env.MNEMONIC)
  return (
    <Container>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        type="metamask"
        onClick={metamask}
        disabled={disableMetamask}
      >
        Connect Wallet
      </Button>
      <Typography variant="h4" component="h6">
        Available Polls
      </Typography>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        type="candidates"
        onClick={candidates}
        disabled={disable}
      >
        View Candidates
      </Button>

      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        type="winner"
        onClick={Winner}
      >
        Winner
      </Button>
      {gridVisibility ? (
        <Grid container>
          <Grid container direction="column" xs={3}>
            <Typography variant="h4" component="h6">
              Candidates
            </Typography>
            {candidateDetail.map((name, index) => (
              <div key={index}>
                <FormControl component="fieldset">
                  <Grid item xs={3}>
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
                  </Grid>
                </FormControl>
              </div>
            ))}
          </Grid>

          <Grid container direction="column" xs={3}>
            <Typography variant="h4" component="h6">
              Position
            </Typography>
            {vying.map((position, index) => (
              <div key={index}>
                <Grid item xs={3}>
                  <ul className={classes.list}>
                    <li>{position}</li>
                  </ul>
                </Grid>
              </div>
            ))}
          </Grid>
        </Grid>
      ) : null}
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        type="vote"
        onClick={Vote}
        disabled={disable1}
      >
        Cast Vote
      </Button>
      {visibility ? (
        <div>
          <Typography variant="h4" component="h6">
            Winning candidate
          </Typography>
          <ul>
            <li>{winn[0].name}</li>
            <li>{winn[0].position}</li>
          </ul>
        </div>
      ) : null}
    </Container>
  )
}
export default PollList
