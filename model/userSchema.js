const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fname: {
        type: String,
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required:  true
    },
    password:{
        type: String,
        required:  true
    },
}, {timestamps: true} )

const UserData = mongoose.model('data',UserSchema)

exports.model = UserData;

