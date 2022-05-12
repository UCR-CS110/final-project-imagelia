const express = require( 'express' );
const app = express();
const PORT = 8080;

app.listen( PORT, err => {
    console.log( `http://localhost/${PORT}`);
    if( err ) console.error( err );
} )