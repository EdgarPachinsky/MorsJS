import { web3_http, web3_socket } from "./init.js"

import NFT_SMC_ADDR from "./addresses/NFT_SMC_ADDR.js";
import NFT from "./contracts/NFT.js"
import NFTMarketplace from "./contracts/NFTMarketplace.js"

const NFTContractInstance = new web3_socket.eth.Contract(NFT, NFT_SMC_ADDR.nft_address)
console.log(NFTContractInstance.events)

NFTContractInstance.events.allEvents({})
    .on('data', async function(event){
        console.log("-----------------");
        console.log(event.event);
        console.log(event.returnValues);
        console.log("-----------------");
        // Do something here
    })
    .on('error', console.error);