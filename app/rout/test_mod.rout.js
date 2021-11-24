import express from "express";
const router = express.Router();

import test_mod_controller from "../controller/test_mod.controller.js"

let prefix = '/test_mod'

router.post('/save', test_mod_controller.save)
router.delete('/delete',test_mod_controller.delete)
router.get('/list', test_mod_controller.list)

export default { router, prefix }