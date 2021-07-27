import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PollForm from './components/PollForm'
import PollList from './components/PollList'
import Nav from './components/Nav'

function App() {
  return (
    <Router>
      <Nav />
      <Route path="/" exact component={PollForm} />
      <Route path="/poll-list" component={PollList} />
    </Router>
  )
}

export default App
