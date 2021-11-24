import express from "express";
const router = express.Router();

import file_controller from "../controller/file.controller.js"

let prefix = '/file'

router.get('/get/:year/:month/:day/:fileName', file_controller.get)

export default { router, prefix }