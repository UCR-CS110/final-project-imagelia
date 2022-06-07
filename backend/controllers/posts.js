const Post = require('../models/Post');
const postGenerator = require('../util/postIdGenerator.js');
const multer = require('multer');

let postId = postGenerator.postIdGenerator();

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../images');
    },
    filename: (req, file, cb) => {
        cb(null, postId);
    },
});

const upload = multer({ storage: fileStorageEngine });

function post(req, res) {
    postId = postGenerator.postIdGenerator();
    const newPost = new Post ({
        title: req.body.title,
        user: req.body.user,
        id: postId
    });
    newPost.save().then(console.log("Post has been added to the database"))
            .catch(err => console.log("Error when creating post:", err));
    upload.single('image'); //input name='image'
}

function getPosts() {
    let arr = [];
    Post.find().lean().then(items => {
        for(var i = 0; i < items.length; i++) {
            arr.push({
                img: '../images/' + items[i].id,
                title: items[i].title,
                author: items[i].user
            }
            );
        }
    })
    return arr;
}

module.exports = {
    post,
    getPosts
};