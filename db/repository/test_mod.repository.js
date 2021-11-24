import Test_mod from "../model/test_mod.model.js"
import randomString from "randomstring"
import { DateTime } from "luxon"
import constants from "../../app/constant/constants.js";

export default {

    /**
     *
     * @param {Object} data
     * @returns {Promise<string|*>}
     */
    save: async (data) => {
        if (data) {
            if (data._id) {
                return update(data);
            } else {
                return create(data);
            }
        }

        return 'error'
    },

    /**
     *
     * @returns {Promise<*|*>}
     */
    list:async () => {
        try {
            return await Test_mod.find({})
        } catch (e) {
            return e.message
        }
    },

    /**
     *
     * @param {Object} data
     * @returns {Promise<*|*>}
     */
    delete:async (data) => {
        try {
            return await Test_mod.deleteOne({_id:data._id})
        } catch (e) {
            return e.message
        }
    },
}

/**
 *
 * @param {Object} entry
 * @returns {Promise<*|*>}
 */
async function create(entry) {
    let result = {}
    try{
        result = await Test_mod.create(entry);
        return {
            status:'success',
            message:'Test_mod successfully added',
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
        result = await Test_mod.updateOne({_id: entry._id}, {$set: entry});
    }catch (e){
        return e.message
    }

    return result
}