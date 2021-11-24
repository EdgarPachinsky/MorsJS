import connection from "../connect.js"
import schemaOptions from "../../app/constant/schema_constants.js"

const mongoose = connection.getMongoose()
const Schema = mongoose.Schema;

const HistorySchema = new Schema({

    name:{
        type: String,
    },
}, schemaOptions);

const History = mongoose.model('history', HistorySchema);
export default History;