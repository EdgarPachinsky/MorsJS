import { web3_http, web3_socket } from "./init.js"

let createAccount = async (password) => {

    let account = await web3_http.eth.accounts.create()
    let encrypted = await web3_http.eth.accounts.encrypt(account.privateKey, password)
    encrypted = JSON.stringify(encrypted)

    return {
        address: account.address,
        meta: encrypted
    }
}

let decryptAccount = async (meta, password) => {
    return await web3_http.eth.accounts.decrypt(meta, password);
}

let sighTx = async (txData, pKey) => {
    let signedTx =  await web3_http.eth.accounts.signTransaction(txData, pKey)
    return await web3_http.eth.sendSignedTransaction(signedTx.rawTransaction)
}

let getTransactionsByAccount = async (myaccount, startBlockNumber = null, endBlockNumber = null) => {
    if (endBlockNumber == null) {
        endBlockNumber = await web3_http.eth.getBlockNumber();
        console.log("Using endBlockNumber: " + endBlockNumber);
    }
    if (startBlockNumber == null) {
        startBlockNumber = endBlockNumber - 1000;
        console.log("Using startBlockNumber: " + startBlockNumber);
    }
    console.log("Searching for transactions to/from account \"" + myaccount + "\" within blocks "  + startBlockNumber + " and " + endBlockNumber);

    let txs = [];
    for (let i = startBlockNumber; i <= endBlockNumber; i++) {

        let block = await web3_http.eth.getBlock(i, true);
        if (block != null && block.transactions != null) {
            block.transactions.forEach( function(e) {
                if (myaccount === "*" || myaccount === e.from || myaccount === e.to) {
                    txs.push(e)
                }
            })
        }
    }

    return txs
}


export default {
    createAccount,
    decryptAccount,
    sighTx,
    getTransactionsByAccount,
}