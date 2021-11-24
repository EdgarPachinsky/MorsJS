import doctor_patientRepository from "../../db/repository/doctor_patient.repository.js"

export default {

    save: async (req, res) => {
        const result = await doctor_patientRepository.save(req.body);
        res.send(result);
    },

    delete: async (req, res) => {
        const result = await doctor_patientRepository.delete(req.body);
        res.send(result);
    },

    list: async (req, res) => {
        const result = await doctor_patientRepository.list();
        res.send(result);
    },
};
