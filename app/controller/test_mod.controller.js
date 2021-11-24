import test_modRepository from "../../db/repository/test_mod.repository.js"

export default {

    save: async (req, res) => {
        const result = await test_modRepository.save(req.body);
        res.send(result);
    },

    delete: async (req, res) => {
        const result = await test_modRepository.delete(req.body);
        res.send(result);
    },

    list: async (req, res) => {
        const result = await test_modRepository.list();
        res.send(result);
    },
};
