import notificationRepository from "../../db/repository/notification.repository.js"

export default {

    save: async (req, res) => {
        const result = await notificationRepository.save(req.body);
        res.send(result);
    },

    delete: async (req, res) => {
        const result = await notificationRepository.delete(req.body);
        res.send(result);
    },

    list: async (req, res) => {
        const result = await notificationRepository.list();
        res.send(result);
    },
};
