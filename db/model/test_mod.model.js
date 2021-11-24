import connection from "../connect.js"
import schemaOptions from "../../app/constant/schema_constants.js"

const mongoose = connection.getMongoose()
const Schema = mongoose.Schema;

const Test_modSchema = new Schema({

    name:{
        type: String,
    },
}, schemaOptions);

const Test_mod = mongoose.model('test_mod', Test_modSchema);
export default Test_mod;