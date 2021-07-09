// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.0 <0.9.0;

contract voting{

    ///custom data type to collect details of candidates
    struct candidateDetails{ 
        bytes32 name;
        bytes32 vyingPosition;
        uint voteCount;
    }

    ///same as above, collecting details of voters
    struct Voter{ 
        bool voted;
        uint vote; ///index of the candidate a voter votes for
        address voterAddress; 
        uint studentId; 
    }
    

    /*public array of data type 'candidateDetails' to
    take more than one candidate when necessary*/

    candidateDetails[] public _candidates; 

    Voter[] internal allowedVoters; ///array of voters allowed to vote

    //mapping(address => Voter) public voters;
    
    address public electionOfficer; ///declaring address of person who calls poll creation contract
    
    uint public expireTime;


    /*constructor takes to sets of array stored in memory to record 
    the details of the various candidates and whatever position the 
    candidate is vies for*/

    function createPoll(bytes32[] memory candidateInfo, bytes32[] memory position, uint _timeLimit) public {
        electionOfficer = msg.sender;
        
        for(uint i = 0; i < candidateInfo.length; i++){
            _candidates.push(candidateDetails({
                name: candidateInfo[i],
                vyingPosition: position[i],
                voteCount: 0
            }));

        }
        
        expireTime = block.timestamp + _timeLimit; //voting time period


    }
    
    
    /*
    approvedVoters function takes addresses and student Ids of people(students) who the ballot
    creator(electionOfficer) wants to participate in the election
    */
    function approveVoters(address[] memory _voter, uint[] memory _studentId) public{
        require(msg.sender == electionOfficer, 
        "Only election commissioner can give rights to vote");

        for(uint j = 0; j < _voter.length; j++){
            
            allowedVoters.push(Voter({
                voterAddress: _voter[j],
                studentId: _studentId[j],
                voted: false,
                vote: 0
            }));
        }
    }

    function castVote(address _address, uint _choice)  public{
        require(msg.sender == _address, "Incorrect transacting address");
        require(expireTime > block.timestamp, "Voting has ended");
        
        for(uint k = 0; k < allowedVoters.length; k++){
            if(allowedVoters[k].voterAddress == _address){
                require(!allowedVoters[k].voted, "Already voted");
                allowedVoters[k].voted = true;
                allowedVoters[k].vote = _choice;
                _candidates[_choice].voteCount += 1;
            }
        }
    }
    
    function winningCandidate() public view
            returns (uint winningCandidate_){
                
                if(msg.sender != electionOfficer){
                    require(expireTime < block.timestamp, "You can check the winner when voting ends");
                
                }
                else{
                    uint winningVoteCount = 0;
                    
                        for (uint p = 0; p < _candidates.length; p++) {
                            if (_candidates[p].voteCount > winningVoteCount) {
                                winningVoteCount = _candidates[p].voteCount;
                                winningCandidate_ = p;
                            }
                        }
                    }
    }

    /** 
     * @dev Calls winningProposal() function to get the index of the winner contained in the proposals array and then
     * @return winnerName_ the name of the winner
     * @return vyingPosition_ the position of the winner
     */
    function winnerName() public view
            returns (bytes32 winnerName_, bytes32 vyingPosition_){
        winnerName_ = _candidates[winningCandidate()].name;
        vyingPosition_ = _candidates[winningCandidate()].vyingPosition;
    }

}