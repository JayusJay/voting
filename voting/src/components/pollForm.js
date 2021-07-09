import {ethers} from 'ethers';

export default function main(){


    async function requestAccount(){
        await window.ethereum.request({method: 'eth_requestAccounts'});
    }
    if(typeof window == 'undefined'){
          requestAccount();
          new ethers.providers.Web3Provider(window.ethereum)

    }
}

//export default pollForm;