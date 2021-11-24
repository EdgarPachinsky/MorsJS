import { web3_http, web3_socket } from "./init.js"

let getHistoryByAccount = async (address) => {
    let history = await web3_http.eth.getTransactionCount(address)
    return history
}

export default {
    getHistoryByAccount
}