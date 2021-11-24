import express from "express";
const router = express.Router();

import doctor_patient_controller from "../controller/doctor_patient.controller.js"

let prefix = '/doctor-patient'

router.post('/save', doctor_patient_controller.save)
router.delete('/delete',doctor_patient_controller.delete)
router.get('/list', doctor_patient_controller.list)

export default { router, prefix }