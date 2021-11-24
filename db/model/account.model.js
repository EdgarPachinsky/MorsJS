import connection from "../connect.js"
import schemaOptions from "../../app/constant/schema_constants.js"

const mongoose = connection.getMongoose()
const Schema = mongoose.Schema;

const AccountSchema = new Schema({

    user:{
        type: Schema.ObjectId,
        ref: "user",
        required: true,
    },
    address:{
        type: String,
    },
    meta:{
        type: String
    },
    accountPassword:{
        type: String,
        required: true,
    }
}, schemaOptions);

const Account = mongoose.model('account', AccountSchema);
export default Account;