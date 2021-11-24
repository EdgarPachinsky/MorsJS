import express from "express";
const router = express.Router();

import login from '../service/auth/login.js'
import verify from "../service/auth/verify.js";

import user_controller from "../controller/user.controller.js"

let prefix = '/user'

router.post('/login', login)
router.post('/check-token', verify , user_controller.checkToken)

router.get('/get', verify , user_controller.checkToken)

router.post('/reset-password', user_controller.changePassword)
router.post('/reset-password-link-check', user_controller.changePasswordLinkCheck)
router.post('/reset-password-main', user_controller.changePasswordMain)


router.post('/save', user_controller.save)
router.delete('/delete',user_controller.delete)
router.get('/list', user_controller.list)

export default { router, prefix }