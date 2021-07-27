import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: 'white',
  },
}))

function Nav() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/" className={classes.title}>
            <Typography variant="h6" color="inherit" className={classes.link}>
              VOTE
            </Typography>
          </Link>
          <Link to="/poll-list" className={classes.link}>
            <Button color="inherit">Poll List</Button>
          </Link>
          <Link to="/" className={classes.link}>
            <Button color="inherit">Poll Form</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  )
}
export default Nav
