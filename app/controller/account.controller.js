import user_password_utils from "../service/user_password_utils.js";
import accountRepository from "../../db/repository/account.repository.js"
import web3_account from "../service/web3_js/account.js"
import Mongoose from "mongoose"


export default {

    getAccounts: async (req, res) => {
        let user = req.user.user
        let existingAccounts = await accountRepository.getByUser(user)
        res.send({
            status:"success",
            message: existingAccounts.length>0?"Address list":"No any address",
            info: existingAccounts
        });
    },

    createAccount: async (req, res) => {
        let user = req.user.user
        let password = req.body.password

        let existingAccounts = await accountRepository.getByUser(user)
        console.log(`EXISTING ACCOUNTS LENGTH _> ${existingAccounts.length}`)
        if(existingAccounts?.length >= 10)
            return res.send({
                status:"error",
                message:"Allowed only 10 accounts"
            });

        let account = {}
        try {
            account = await web3_account.createAccount(password);

            password = await user_password_utils.createHash(password)
            let data = {
                ...account,
                accountPassword: password,
                user: Mongoose.Types.ObjectId(user._id),
            }

            await accountRepository.save(data);
            res.send({
                status:"success",
                message:"Address created",
                info: account
            });
        }catch (e){
            console.log(e.message)

            res.send({
                status:"error",
                message:e.message,
                info: {}
            });
        }
    },

    fetchPKey: async (req, res) => {
        let user = req.user.user
        let address = req.body.address
        let password = req.body.password

        let existingAccount = await accountRepository.getByUserAndAddress(user, address)

        if(!existingAccount || existingAccount.length === 0 || !existingAccount[0])
            return res.send({
                status:"error",
                message:"No account found"
            });


        if(! await user_password_utils.isSame(password, existingAccount[0].accountPassword))
            return res.send({
                status:"error",
                message:"Wrong password for account",
                password:password
            });

        let decrypted = {}

        try {
            let restoredJSON = JSON.parse(existingAccount[0].meta)
            decrypted = await web3_account.decryptAccount(restoredJSON, password)

            return res.send({
                status:"warning",
                message: "NEVER SHOW YOUR PRIVATE KEY",
                pKey: decrypted,
            });

        }catch (e){
            return res.send({
                status:"error",
                message: e.message
            });
        }
    },
    // save: async (req, res) => {
    //     const result = await accountRepository.save(req.body);
    //     res.send(result);
    // },
    //
    // delete: async (req, res) => {
    //     const result = await accountRepository.delete(req.body);
    //     res.send(result);
    // },
    //
    // list: async (req, res) => {
    //     const result = await accountRepository.list();
    //     res.send(result);
    // },
};
