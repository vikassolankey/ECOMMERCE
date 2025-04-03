const { required } = require('joi');
const mongoose = require('mongoose');
const pasportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    // username: { type: String, required: true },
    email: { type: String, required: true, unique: true  , trim: true },
    // password: { type: String, required: true },
    role: { type: String, required:true },

    cart:[
        {
            productId :{
                type: mongoose.Schema.Types.ObjectId,
                ref:'Product'
            },
            qantity:{
                type:Number,
                default:1
            }
        }
    ]
});
userSchema.plugin(pasportLocalMongoose)


const User = mongoose.model('User', userSchema);

module.exports = User;