const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created:{
        type: Date,
        default: Date.now
    },
    friends: {
        type: Array
    }
});

module.exports = Item = mongoose.model( "user", userSchema );