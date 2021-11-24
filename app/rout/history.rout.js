import express from "express";
import verify from "../service/auth/verify.js";
const router = express.Router();

import history_controller from "../controller/history.controller.js"

let prefix = '/history'

// router.post('/save', history_controller.save)
// router.delete('/delete',history_controller.delete)
// router.get('/list', history_controller.list)

router.post('/get-history-by-account', verify, history_controller.getByAccount)

export default { router, prefix }