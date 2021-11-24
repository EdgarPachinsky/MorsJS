import express from "express";
import verify from "../service/auth/verify.js";

const router = express.Router();

import transaction_controller from "../controller/transaction.controller.js"

let prefix = "/transaction"

router.post('/send', verify, transaction_controller.sendEthToAddress)

export default { router , prefix }