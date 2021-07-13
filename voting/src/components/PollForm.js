import React, { Component } from 'react';
import { newContextComponents } from "@drizzle/react-components";
const { AccountData, ContractData, ContractForm } = newContextComponents;


export default ({ drizzle, drizzleState }) => {
    // destructure drizzle and drizzleState from props
    return (
      <div className="App">
            <div>
            <h1>Voting Poll Form</h1>
            <p>
                Testing this out
            </p>
            </div>
        
  
        <div className="section">
          <h2>Active Account</h2>
          <AccountData
            drizzle={drizzle}
            drizzleState={drizzleState}
            accountIndex={0}
            units="ether"
            precision={3}
          />
        </div>
  
        <div className="section">
          <h2>Voting contract</h2>
          <p>
            This shows a voting contract that accepts an array of information and time
          </p>
 
          <ContractForm drizzle={drizzle}
           contract="voting" 
           method="createPoll"
           labels = {["candidate info", "position ", "time limit"]}
          
          />
        </div>
        
          <p>Approve address to vote</p>
          <ContractForm 
          drizzle = {drizzle}
          contract = "voting"
          method = "approveVoters"
          labels = {["Address", "Student ID"]}
          />

          <p>Candidates</p>
          <ContractData 
          drizzle = {drizzle}
          contract = "voting"
          drizzleState = {drizzleState}
          method = "_candidates"
          toUtf8
          methodArgs = {drizzleState.units}
          />
          
      </div> 

    );
};
