import connection from "../connect.js"
import schemaOptions from "../../app/constant/schema_constants.js"

const mongoose = connection.getMongoose()
const Schema = mongoose.Schema;

const PhoneSchema = new Schema({

    name:{
        type: String,
    },
}, schemaOptions);

const Phone = mongoose.model('phone', PhoneSchema);
export default Phone;