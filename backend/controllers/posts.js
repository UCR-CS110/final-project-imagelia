const Post = require('../models/Post');
const postGenerator = require('../util/postIdGenerator.js');
const multer = require('multer');

let postId = postGenerator.postIdGenerator();

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images');
    },
    filename: (req, file, cb) => {
        cb(null, postId + '--' + file.originalname);
    },
});

const upload = multer({ storage: fileStorageEngine });

function post(req, res) {
    postId = postGenerator.postIdGenerator();
    const newPost = new Post ({
        title: req.body.title,
        user: req.body.user,
        body: req.body.body,
        picture: req.body.picture,
        id: postId
    });
    newPost.save().then(console.log("Post has been added to the database"))
            .catch(err => console.log("Error when creating post:", err));
    upload.single('image'); //input name='image'
}

module.exports = {
    post
};