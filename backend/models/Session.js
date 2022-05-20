const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const sessionSchema = new Schema({
    id: {
        type: String,
        required: true,
        index: true
    },
    username: {
        type:String,
        required: true
    },
    created:{
        type: Date,
        default: Date.now,
        required: true
    },
    expires:{
        type: Date,
        required: true
    }
});

module.exports = Item = mongoose.model( "session", sessionSchema );