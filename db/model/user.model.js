import connection from "../connect.js"
import schemaOptions from "../../app/constant/schema_constants.js"
import user_password_utils from "../../app/service/user_password_utils.js"

const mongoose = connection.getMongoose()
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    fullName:  {
        type: String,
        required: true,
    },
    username:  {
        type: String,
        required: true,
        unique:true,
    },
    email:  {
        type: String,
        required: true
    },
    password:  {
        type: String,
        required: true
    },
    role:{
        type:Schema.Types.ObjectId,
        ref:'role'
    },
    isDisabled: {
        type: Boolean,
        default: false
    },
    avatar:{
        type: String,
        default:null,
    },
    profSkills:{
        type:Array,
        default:[]
    },
    softSkills:{
        type:Array,
        default:[]
    },
}, schemaOptions);


UserSchema.pre('updateOne', async function() {

    // this is an existing document from DB (not updated)
    let thisDoc = await this.model.findOne(this.getQuery());

    //  check if password field exists
    //  only for password reset or update events
    //  to update this , ensure that updating query contains password field
    if(this._update.password) {
        // check if old password and new passwords are same
        if (await user_password_utils.isSame(this._update.password, thisDoc.password))
            throw Error('Passwords are same') // throw error to stop further update

        // update if passwords not same
        this._update.password = await user_password_utils.createHash(this._update.password)
    }
});

UserSchema.pre('save',async function () {
    this.password = await user_password_utils.createHash(this.password)
})


const User = mongoose.model('user', UserSchema);
export default User;