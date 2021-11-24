import Web3 from "web3"
import constants from "../../constant/constants.js";

// Using HTTPS
export const web3_http = new Web3(constants.WEB3_HTTP_URL_LOCAL);
export const web3_socket = new Web3(constants.WEB3_SOCKET_URL_LOCAL);