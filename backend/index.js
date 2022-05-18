const express = require( 'express' );
const bodyParser = require( 'body-parser' )
const mongoose = require( 'mongoose' );
const config = require( 'config' );

const app = express();
const PORT = 8080;

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


app.post( '/test/:test', (q,r)=>{
    console.log( q.body.test )
    r.end( 'e' );
} 
);


app.listen( PORT, err => {
    console.log( `http://localhost:${PORT}`);
    if( err ) console.error( err );
} )