import transactionRepository from "../../db/repository/transaction.repository.js"

export default {

    // save: async (req, res) => {
    //     const result = await transactionRepository.save(req.body);
    //     res.send(result);
    // },
    //
    // delete: async (req, res) => {
    //     const result = await transactionRepository.delete(req.body);
    //     res.send(result);
    // },
    //
    // list: async (req, res) => {
    //     const result = await transactionRepository.list();
    //     res.send(result);
    // },


    sendEthToAddress: async (req, res) => {
        let user = req.user.user
        const result = await transactionRepository.sendEthToAddress(user, req.body);
        res.send(result);
    },
};
