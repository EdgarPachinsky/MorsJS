import express from "express";
import verify from "../service/auth/verify.js";
const router = express.Router();

import nft_controller from "../controller/nft.controller.js"

let prefix = '/nft'

// router.post('/save', verify , nft_controller.save)
// router.delete('/delete',nft_controller.delete)
// router.get('/list', nft_controller.list)

router.post('/list',  nft_controller.list)
router.post('/create', verify, nft_controller.create)
router.post('/buy', verify, nft_controller.buy)
router.post('/get-user-nfts', verify, nft_controller.getUserNFTs)
// router.post('/buy', verify, nft_controller.buy)

export default { router, prefix }