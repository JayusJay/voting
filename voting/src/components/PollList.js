import React from 'react';
import { newContextComponents } from "@drizzle/react-components";
const { AccountData, ContractData, ContractForm } = newContextComponents;


export default ({ drizzle, drizzleState }) => {
    // destructure drizzle and drizzleState from props
    return (


        
      <div className="App">
            <div>
            <h1>Voting Poll List</h1>
            <p>
                Also Testing this out
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
            This shows a list of Available Polls you can vote on
          </p>
 
          <ContractForm drizzle={drizzle}
           contract="voting" 
           method="castVote"
           labels = {["eth address", "choice "]}
          
          />
        </div>
        
        <p>
            Election Officer
        </p>
        <ContractData
        drizzle = {drizzle}
        contract = "voting"
        drizzleState = {drizzleState}
        method = "electionOfficer"
        />
          {/* <p>Candidates</p>
          <ContractData 
          drizzle = {drizzle}
          contract = "voting"
          drizzleState = {drizzleState}
          method = "_candidates"
          toUtf8
          methodArgs = {drizzleState.units}
          /> */}
          
      </div> 

    );
};
