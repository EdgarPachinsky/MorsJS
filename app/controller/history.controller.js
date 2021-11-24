import historyRepository from "../../db/repository/history.repository.js"
import accountRepository from "../../db/repository/account.repository.js";
import user_password_utils from "../service/user_password_utils.js";
import web3_account from "../service/web3_js/account.js";
import web3_history from "../service/web3_js/history.js"

export default {

    // save: async (req, res) => {
    //     const result = await historyRepository.save(req.body);
    //     res.send(result);
    // },
    //
    // delete: async (req, res) => {
    //     const result = await historyRepository.delete(req.body);
    //     res.send(result);
    // },
    //
    // list: async (req, res) => {
    //     const result = await historyRepository.list();
    //     res.send(result);
    // },

    getByAccount: async (req, res) => {
        let user = req.user.user
        let password = req.body.password
        let address = req.body.address

        let existingAccount = await accountRepository.getByUserAndAddress(user, address)
        if(!existingAccount || existingAccount.length === 0 || !existingAccount[0])
            return {
                status:"error",
                message:"No account found"
            };

        if(! await user_password_utils.isSame(password, existingAccount[0].accountPassword))
            return {
                status:"error",
                message:"Wrong password for account",
                password:password
            };

        let decrypted = {}
        console.log('dada')
        const result = await web3_account.getTransactionsByAccount(address,0);
        res.send({
            account: existingAccount[0],
            result: result
        });
    },
};
