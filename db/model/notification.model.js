import connection from "../connect.js"
import schemaOptions from "../../app/constant/schema_constants.js"

const mongoose = connection.getMongoose()
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({

    name:{
        type: String,
    },
}, schemaOptions);

const Notification = mongoose.model('notification', NotificationSchema);
export default Notification;