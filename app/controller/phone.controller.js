import phoneRepository from "../../db/repository/phone.repository.js"

export default {

    save: async (req, res) => {
        const result = await phoneRepository.save(req.body);
        res.send(result);
    },

    delete: async (req, res) => {
        const result = await phoneRepository.delete(req.body);
        res.send(result);
    },

    list: async (req, res) => {
        const result = await phoneRepository.list();
        res.send(result);
    },
};
