// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.0;

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

    Voter[] public allowedVoters; ///array of voters allowed to vote

    mapping(address => Voter) public voters;

    address public electionOfficer; ///declaring address of person who calls poll creation contract


    /*constructor takes to sets of array stored in memory to record 
    the details of the various candidates and whatever position the 
    candidate is vies for*/

    function main(bytes32[] memory candidateInfo, bytes32[] memory position) public {
        electionOfficer = msg.sender;
        
        for(uint i = 0; i < candidateInfo.length; i++){
            _candidates.push(candidateDetails({
                name: candidateInfo[i],
                vyingPosition: position[i],
                voteCount: 0
            }));

        }

    }

    function approvedVoters(address[] memory _voter, uint[] memory _studentId) public{
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

}