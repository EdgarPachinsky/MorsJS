import express from "express";
const router = express.Router();

import main_view_controller from "../controller/main_view.controller.js"

let prefix = ''

router.get('/', main_view_controller.index );

export default { router , prefix }