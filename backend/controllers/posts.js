const Post = require('../models/Post');
const postGenerator = require('../util/postIdGenerator.js');

const utils = require( '../util/utils' );

// let postId = postGenerator.postIdGenerator();

// const fileStorageEngine = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, '../public/images');
//     },
//     filename: (req, file, cb) => {
//         cb(null, postId);
//     },
// });

// const upload = multer({ storage: fileStorageEngine });

// function post(req, res) {
//     console.log( "backend" )
//     postId = postGenerator.postIdGenerator();
//     const newPost = new Post ({
//         title: req.body.title,
//         user: 'tesp',
//         id: postId
//     });
//     newPost.save().then(console.log("Post has been added to the database"))
//             .catch(err => console.log("Error when creating post:", err));
//     console.log("going to upload")
//     upload.single('image'); //input name='image'
//     console.log("uploaded");
// }

function getPosts(req, res) {
    let arr = [];
    Post.find().lean().then(items => {
        for( let item of items ){
            item.img = 'http://localhost:8080/images/' + item.id + '.jpg';
            arr.push( item );
        }

        res.json( utils.createJsonPayload( true, arr ) );
    });
}

module.exports = {
    getPosts
};