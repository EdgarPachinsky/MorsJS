import User from "../model/user.model.js"
import PasswordChange from "../model/password_change.model.js";
import randomString from "randomstring"
import { DateTime } from "luxon"
import mailer from "../../app/service/mailer.js";
import constants from "../../app/constant/constants.js";
import mailer_constants from "../../app/constant/mailer_constants.js";

export default {


    /**
     *
     * @param {Object} data
     * @returns {Promise<string|*>}
     */
    save: async (data) => {
        if (data) {
            if (data._id) {
                data.password?delete data.password:""

                return update(data);
            } else {
                return create(data);
            }
        }

        return 'error'
    },

    /**
     *
     * @param {Object} attributes
     * @returns {Promise<*|*>}
     */
    list:async (attributes = {}) => {
        try {
            return await User.find({},attributes)
                .select('_id fullName username email avatar profSkills softSkills')
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
            return await User.deleteOne({_id:data._id})
        } catch (e) {
            return e.message
        }
    },

    /**
     *
     * @param {Object} data
     * @returns {Promise<{link: string, message: string, status: string}|*>}
     */
    changePassword:async (data) => {
        try {
            // for first lets find a user with this email
            let user = await User.findOne({email:data.email})

            // find if there is any links generated for this user
            let existingLink = await PasswordChange.find({user:user}).sort({ _id: -1 }).limit(1)

            // get current time to compere with existing link
            let currentDate = DateTime.local()

            // get first element in array
            existingLink = existingLink.length>0?existingLink[0]:NaN

            // if there is no any link generated or generated link expiration time passed
            // generate new link and send kink to user email
            if(!existingLink || ( existingLink && existingLink.expiresAt < currentDate )){

                // generate new random string with 100 length
                let link = randomString.generate({
                    length: 100,
                    charset: 'alphabetic'
                })

                // set expiration time to 2 minutes
                let expiresAt = currentDate.plus({ minutes: constants.PASSWORD_EXPIRATION_TIME })

                // wait for new record to be created in db
                await PasswordChange.create({user:user,link:link,expiresAt:expiresAt})

                // create change link text , also can be some HTML template
                let changeLink =
                    `localhost:3000/auth/reset-password/new?link=${link}`

                // initiate mail send and send immediate response to user
                mailer.send(mailer_constants.getSendOptions(
                    'test@gmail.com','test1@gmail.com','Password Change Link','', changeLink
                )).then(() => {})

                return {
                    status: "success",
                    message: "link created",
                    link: `localhost:3000/auth/reset-password/new?link=${link}`
                }
            }

            // any other condition means that link already exists and not expired
            return {
                status: "error",
                message: "Link already exists",
                link: `localhost:3000/auth/reset-password/new?link=${existingLink?existingLink.link:'__link__'}`
            }
        } catch (e) {
            return e.message
        }
    },

    /**
     *
     * @param {Object} data
     * @returns {Promise<{status: string}>}
     */
    changePasswordLinkCheck: async (data) => {
        if(!data.link || (data && data.link.length !== 100 ))
            return {
                status: "Bad request"
            }

        let existingLink = await PasswordChange.findOne({link:data.link})
        let currentDate = DateTime.local()

        if(existingLink && existingLink.expiresAt > currentDate)
            return {
                status: "active"
            }

        return {
            status: "expired"
        }
    },

    /**
     *
     * @param {Object} data
     */
    changePasswordMain: async (data) => {

        // get link from data
        let link = data.link
        // get password from data
        let password = data.password
        // get local date
        let currentDate = DateTime.local()

        // if link damaged or wrong
        if(!link || link.length !== 100)
            return {
                status: "Bad request"
            }

        // check if any link existing
        let passwordChangeLink = await PasswordChange.findOne({link:link}).populate('user')
        // if link not exists of expired
        if(!passwordChangeLink || (passwordChangeLink && passwordChangeLink.expiresAt < currentDate ))
            return {
                status: "Bad request or link expired"
            }

        // if user deleted or disabled
        if(!passwordChangeLink.user || (passwordChangeLink.user && passwordChangeLink.user.isDisabled === true))
            return {
                status: "Error user not found or disabled"
            }
        // get old user and change password to new
        let oldUser = passwordChangeLink.user
        oldUser.password = password
        // initialize newUser variable
        let newUser = NaN
        try {
            // try to update , written in try catch block to check before
            // update if passwords are same
            newUser = await User.updateOne({_id: oldUser._id}, oldUser)
        }catch (e){
            return {
                status: "Error",
                message: e.message
            }
        }
        return {
            status:"success",
            message:"Password changed successfully"
        }
    }
}

/**
 *
 * @param {Object} entry
 * @returns {Promise<*|*>}
 */
async function create(entry) {
    let result = {}
    try{
        result = await User.create(entry);
        return {
            status:'success',
            message:'User successfully registered',
            data:result,
        }
    }catch (e){
        return {
            status:'error',
            code:e.message,
            data:{}
        }
    }
}


/**
 *
 * @param {Object} entry
 * @returns {Promise<*|*>}
 */
async function findOne(entry) {
    let result = {}
    try{
        result = await User.findOne(entry);
        return {
            status:'success',
            message:'User successfully found',
            data:result,
        }
    }catch (e){
        return {
            status:'error',
            code:e.message,
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
        result = await User.updateOne({_id: entry._id}, {$set: entry});
    }catch (e){
        return e.message
    }

    return result
}