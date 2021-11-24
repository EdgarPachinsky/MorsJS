import testmoduleRepository from "../../db/repository/testmodule.repository.js"

export default {

    save: async (req, res) => {
        const result = await testmoduleRepository.save(req.body);
        res.send(result);
    },

    delete: async (req, res) => {
        const result = await testmoduleRepository.delete(req.body);
        res.send(result);
    },

    list: async (req, res) => {
        const result = await testmoduleRepository.list();
        res.send(result);
    },
};
