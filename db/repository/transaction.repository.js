import Transaction from "../model/transaction.model.js"
import randomString from "randomstring"
import { DateTime } from "luxon"
import constants from "../../app/constant/constants.js";
import transaction from "../../app/service/web3_js/transaction.js";
import accountRepository from "./account.repository.js";
import user_password_utils from "../../app/service/user_password_utils.js";
import web3_account from "../../app/service/web3_js/account.js";
import web3_utils from "../../app/service/web3_js/utils.js"

export default {

    sendEthToAddress: async (user, data) => {
        let password = data.confirmPassword
        let address = data.from

        // let existingAccount = await accountRepository.getByUserAndAddress(user, address)
        // if(!existingAccount || existingAccount.length === 0 || !existingAccount[0])
        //     return {
        //         status:"error",
        //         message:"No account found"
        //     };

        // if(! await user_password_utils.isSame(password, existingAccount[0].accountPassword))
        //     return {
        //         status:"error",
        //         message:"Wrong password for account",
        //         password:password
        //     };

        // let decrypted = {}

        try {
            // let restoredJSON = JSON.parse(existingAccount[0].meta)
            // decrypted = await web3_account.decryptAccount(restoredJSON, password)
            //
            // let pKey = decrypted.privateKey
            // console.log(pKey)
            let pKey = "efca19fe6abb7a0853933dd1e828fbe5e594aa2fd9774a2daed13aa6a1290561"

            let transactionData = {
                from: address,
                to: data.to,
                value: await web3_utils.toWei(data.amount),
                gas:data.gas
            }

            let txResult = await web3_account.sighTx(transactionData, pKey)

            return {
                status:"success",
                message: "Ethereum sent",
                data: txResult
            };
        }catch (e){
            return {
                status:"error",
                message: e.message
            };
        }
    },


    /**
     *
     * @param {Object} data
     * @returns {Promise<string|*>}
     */
    // save: async (data) => {
    //     if (data) {
    //         if (data._id) {
    //             return update(data);
    //         } else {
    //             return create(data);
    //         }
    //     }
    //
    //     return 'error'
    // },

    /**
     *
     * @returns {Promise<*|*>}
     */
    // list:async () => {
    //     try {
    //         return await Transaction.find({})
    //     } catch (e) {
    //         return e.message
    //     }
    // },

    /**
     *
     * @param {Object} data
     * @returns {Promise<*|*>}
     */
    // delete:async (data) => {
    //     try {
    //         return await Transaction.deleteOne({_id:data._id})
    //     } catch (e) {
    //         return e.message
    //     }
    // },
}

/**
 *
 * @param {Object} entry
 * @returns {Promise<*|*>}
 */
async function create(entry) {
    let result = {}
    try{
        result = await Transaction.create(entry);
        return {
            status:'success',
            message:'Transaction successfully added',
            data:result,
        }
    }catch (e){
        return {
            status:'error',
            code:e.message.code,
            data:{}
        }
    }
}

/**
 *
 * @param {Object} entry
 * @returns {Promise<*|*>}
 */
async function update(entry) {
    let result = {}
    try{
        result = await Transaction.updateOne({_id: entry._id}, {$set: entry});
    }catch (e){
        return e.message
    }

    return result
}