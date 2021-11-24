import express from "express";
import verify from "../service/auth/verify.js";

const router = express.Router();

import wallet_controller from "../controller/wallet.controller.js"

let prefix = '/wallet'

// router.post('/save', verify , wallet_controller.save)
// router.delete('/delete', verify , wallet_controller.deleteWallet)
// router.post('/get-balance', verify , wallet_controller.getBalance)
// router.post('/get-tx-history', verify , wallet_controller.getTxHistory)
// router.get('/list', wallet_controller.list)
// router.get('/get', verify , wallet_controller.getWallet)
// router.post('/send-ada', verify , wallet_controller.sendAda)

router.post('/create-wallet', verify , wallet_controller.createWallet)

export default { router, prefix }