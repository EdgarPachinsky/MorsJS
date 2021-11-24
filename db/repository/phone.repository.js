import Phone from "../model/phone.model.js"
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
            return await Phone.find({})
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
            return await Phone.deleteOne({_id:data._id})
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
        result = await Phone.create(entry);
        return {
            status:'success',
            message:'Phone successfully added',
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
        result = await Phone.updateOne({_id: entry._id}, {$set: entry});
    }catch (e){
        return e.message
    }

    return result
}