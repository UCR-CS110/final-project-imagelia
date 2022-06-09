const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const commentSchema = new Schema({
    user: {
        type: String,
        required: true,
    },
    created:{
        type: Date,
        default: Date.now,
        required: true
    },
    text:{
        type:String,
        require: true
    }
});
const postSchema = new Schema({
    id: {
        type: String,
        required: true,
        index: true
    },
    title: String,
    user: {
        type: String,
        required: true,
    },
    /*body: String,
    picture:{
        URI:{
            type:String,
            required:true
        },
        alt:String
    },*/
    created:{
        type: Date,
        default: Date.now,
        required: true
    },
    comments:[ 
        commentSchema 
    ]
    
});

module.exports = Item = mongoose.model( "post", postSchema );

// module.exports = Item = mongoose.model( "comment", commentSchema );

/*

{
    "_id": {
      "$oid": "628c0ec06009e038d8eec341"
    },
    "title":"title",
    "id": "some garbage here",
    "user": "joe moma",
    "body":"some long string of text blagh",
    "picture":{
      "URI":"/pubImg/",
      "alt":"asdlkasdlkaj"    
    },
    "created": new Date(),
    "comments":[
        {
            "user":"Juan Deg",
            "created": new Date(),
            "text":"offensive comment here"
        }
        ...
    ]
      
  }
  */