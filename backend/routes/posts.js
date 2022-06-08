
const express = require( 'express' );
let router = express.Router();

const postController = require( '../controllers/posts' );


const Post = require('../models/Post');
const multer = require('multer');
const postGenerator = require('../util/postIdGenerator.js');
const utils = require( '../util/utils' );
let postId = postGenerator.postIdGenerator();
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, postId + file.originalname.slice( file.originalname.lastIndexOf('.') ) );
    },
});

const upload = multer({ storage: fileStorageEngine });


router.post( "/post", upload.single('image'), ( req, res ) =>  {
    console.log( "backend" )
    postId = postId;
    const newPost = new Post ({
        title: req.body.title,
        user: 'tesp',
        id: postId
    });
    newPost.save().then(()=>{
        console.log("Post has been added to the database");
        res.status(200).json( utils.createJsonPayload( true ) );
        postId = postGenerator.postIdGenerator();
    })
    .catch(err => console.log("Error when creating post:", err));
} );

router.get( "/getPosts", postController.getPosts );

module.exports = router;