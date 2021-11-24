import connection from "../connect.js"
import schemaOptions from "../../app/constant/schema_constants.js"

const mongoose = connection.getMongoose()
const Schema = mongoose.Schema;

const DoctorPatientSchema = new Schema({

    name:{
        type: String,
    },
}, schemaOptions);

const DoctorPatient = mongoose.model('DoctorPatient', DoctorPatientSchema);
export default DoctorPatient;