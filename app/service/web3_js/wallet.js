import { web3_http, web3_socket } from "./init.js"

let createWallet = (accounts) => {
    let wallet = web3_http.eth.accounts.wallet.create(1)

    return wallet
}

let getWallet = () => {

}

export default {
    createWallet,
    getWallet
}