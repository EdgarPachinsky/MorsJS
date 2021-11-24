import express from "express";
const router = express.Router();

import role_controller from "../controller/role.controller.js"

let prefix = '/role'

router.post('/save', role_controller.save)
router.delete('/delete',role_controller.delete)
router.get('/list', role_controller.list)

export default { router, prefix }