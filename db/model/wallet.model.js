import connection from "../connect.js"
import schemaOptions from "../../app/constant/schema_constants.js"

const mongoose = connection.getMongoose()
const Schema = mongoose.Schema;

const WalletSchema = new Schema({

    name:{
        type: String,
    },
}, schemaOptions);

const Wallet = mongoose.model('wallet', WalletSchema);
export default Wallet;