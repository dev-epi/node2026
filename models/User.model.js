const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: { type: String },
    email: {
        type: String,
        required: [true , 'Email required'],
        unique: true
    },
    role: { type: String, default: 'employee' },
    password: { type: String, minlength: [6, 'At least 6 caracters'] },
    isFirstLogin : {type :Boolean , default:false}
}, {timestamps : true})
module.exports = mongoose.model('User', userSchema)