const express = require( 'express' );
const bodyParser = require( 'body-parser' )
const app = express();
const PORT = 8080;

// app.use( express.json() );
// app.use( express.urlencoded( {extended: false}) )
app.use( bodyParser.urlencoded( {extended: false} ) )
app.use( bodyParser.json() );

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