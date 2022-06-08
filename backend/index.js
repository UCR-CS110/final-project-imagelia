const express = require( 'express' );
const bodyParser = require( 'body-parser' )
const mongoose = require( 'mongoose' );
const config = require( 'config' );
const cors = require('cors');
const Post = require('./models/Post');
const multer = require('multer');
const postGenerator = require('./util/postIdGenerator.js');
const utils = require( './util/utils' );
const app = express();
const PORT = 8080;

app.use(cors())

app.use(express.static('public'))
// app.use( express.json() );
// app.use( express.urlencoded( {extended: false}) )
app.use( bodyParser.urlencoded( {extended: false} ) )
app.use( bodyParser.json() );

const db = config.get( 'mongoURL');
mongoose.connect( db, err => {
    if( err ) console.error( "cant connect", err );
    console.log( 'connected' );
})

const userRouter = require( './routes/users.js' ); //middleware
app.use( '/users', userRouter );

const commentRouter = require( './routes/comments' );
app.use( '/comments', commentRouter );


//because multer is mean    
var fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        cb(null, postGenerator.postIdGenerator() + file.originalname.slice( file.originalname.lastIndexOf('.') ));
    },
});

var upload = multer({ storage: fileStorageEngine });
app.post( '/posts/test', (q,r)=>r.end('12345667889'))
app.post( "/posts/post", upload.single( ('image'), ( req, res ) =>  {
    console.log( "backend" )
    postId = postGenerator.postIdGenerator();
    const newPost = new Post ({
        title: req.body.title,
        user: 'tesp',
        id: postId
    });
    newPost.save().then(()=>{
        console.log("Post has been added to the database");
        res.status(200).json( utils.createJsonPayload( true ) )
    })
    .catch(err => console.log("Error when creating post:", err));
    
} ))

const postRouter = require('./routes/posts');
app.use( '/posts', postRouter);

app.post( '/test/:test', (q,r)=>{
    console.log( q.body.test )
    r.end( 'e' );
} 
);

// app.get( '*',(q,r)=>{
//     r.status( 404 );
// })


app.listen( PORT, err => {
    console.log( `http://localhost:${PORT}`);
    if( err ) console.error( err );
} )