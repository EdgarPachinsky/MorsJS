import express from "express";
import verify from "../service/auth/verify.js";

const router = express.Router();

import account_controller from "../controller/account.controller.js"

let prefix = '/account'

// router.post('/save', account_controller.save)
// router.delete('/delete',account_controller.delete)
// router.get('/list', account_controller.list)
router.get('/get-accounts', verify, account_controller.getAccounts)
router.post('/create-account', verify, account_controller.createAccount)
router.post('/fetch-pKey', verify, account_controller.fetchPKey)

export default { router, prefix }