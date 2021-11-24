import express from "express";
const router = express.Router();

import notification_controller from "../controller/notification.controller.js"

let prefix = '/notification'

router.post('/save', notification_controller.save)
router.delete('/delete',notification_controller.delete)
router.get('/list', notification_controller.list)

export default { router, prefix }