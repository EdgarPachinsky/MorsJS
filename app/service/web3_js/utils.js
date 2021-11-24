import { web3_http, web3_socket } from "./init.js"

let toWei = async (eth) => {
    return await web3_http.utils.toWei(eth, 'ether')
}

export default {
    toWei
}