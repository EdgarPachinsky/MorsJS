import connection from "../connect.js"
import schemaOptions from "../../app/constant/schema_constants.js"

const mongoose = connection.getMongoose()
const Schema = mongoose.Schema;

const NftSchema = new Schema({

    name:{
        type: String,
    },
}, schemaOptions);

const Nft = mongoose.model('nft', NftSchema);
export default Nft;