// DB IMPORTS
import mongoose from "mongoose";
import db_config from "../db/dbconfig.js"
import db_config_additional from "../db/dbconfig_additional.js"
import constants from "../app/constant/constants.js";

// EXPORT FUNCTION FOR DB CONNECTION TO USE IN INDEX.JS FILE
export default {
    connect: (resolve, reject) => {
        return new Promise((resolve, reject) => {
            mongoose.connect(
                `${db_config.db_prefix}${db_config.db_host}:${db_config.db_port}/${db_config.db_name}`,
                db_config_additional, async (err) => {
                    if (!err)
                        resolve(`CONNECTED TO DB WITH PORT:${db_config.db_port}`)
                    else
                        reject(constants.DB_CONNECT_ERROR)

                }
            )
        })
    },
    getMongoose() {
        return mongoose;
    }
}