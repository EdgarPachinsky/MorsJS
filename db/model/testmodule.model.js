import connection from "../connect.js"
import schemaOptions from "../../app/constant/schema_constants.js"

const mongoose = connection.getMongoose()
const Schema = mongoose.Schema;

const TestmoduleSchema = new Schema({

    name:{
        type: String,
    },
}, schemaOptions);

const Testmodule = mongoose.model('testmodule', TestmoduleSchema);
export default Testmodule;