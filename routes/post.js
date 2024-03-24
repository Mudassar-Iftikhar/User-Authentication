const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// Define the schema for a post
const postSchema = new mongoose.Schema({
    postText: {
        type: String,
        required: true
    },
    user:{
       type : mongoose.Schema.Types.ObjectId,
       ref:'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Array,
        default: [ ],
    }
});

// Create a Post model using the schema
module.exports = mongoose.model('Post', postSchema);

