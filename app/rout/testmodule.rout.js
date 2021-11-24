import express from "express";
const router = express.Router();

import testmodule_controller from "../controller/testmodule.controller.js"

let prefix = '/testmodule'

router.post('/save', testmodule_controller.save)
router.delete('/delete',testmodule_controller.delete)
router.get('/list', testmodule_controller.list)

export default { router, prefix }