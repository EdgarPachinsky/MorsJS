import roleRepository from "../../db/repository/role.repository.js"

export default {

    save: async (req, res) => {
        const result = await roleRepository.save(req.body);
        res.send(result);
    },

    delete: async (req, res) => {
        const result = await roleRepository.delete(req.body);
        res.send(result);
    },

    list: async (req, res) => {
        const result = await roleRepository.list();
        res.send(result);
    },
};
