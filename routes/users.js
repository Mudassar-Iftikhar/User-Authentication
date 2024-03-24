const mongoose = require('mongoose');
const plm = require("passport-local-mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/pinterest');
// const Schema = mongoose.Schema;

// Define the schema for the user
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        // required: true
    },
    posts: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Post'
        }
        // mongoose.Schema.Types.ObjectId
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Post'
    // }
    ],
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
        required: true
    }
});

userSchema.plugin(plm)
// Create a User model using the schema
module.exports = mongoose.model('User', userSchema);

