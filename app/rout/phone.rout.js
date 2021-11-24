import express from "express";
const router = express.Router();

import phone_controller from "../controller/phone.controller.js"

let prefix = '/phone'

router.post('/save', phone_controller.save)
router.delete('/delete',phone_controller.delete)
router.get('/list', phone_controller.list)

export default { router, prefix }