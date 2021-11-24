import connection from "../connect.js"
import schemaOptions from "../../app/constant/schema_constants.js"

const mongoose = connection.getMongoose()
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({

    name:{
        type: String,
    },
}, schemaOptions);

const Transaction = mongoose.model('transaction', TransactionSchema);
export default Transaction;