const express = require( 'express' );
const app = express();
const PORT = 8080;

const userRouter = require( './routes/users.js' ); //middleware

app.get( '/test/:d', (q,r)=>{
    console.log( q.params ) } 
);
app.use( '/users', userRouter );

app.listen( PORT, err => {
    console.log( `http://localhost:${PORT}`);
    if( err ) console.error( err );
} )