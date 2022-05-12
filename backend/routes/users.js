
const express = require( 'express' );
const bodyParser = require( 'body-parser' )
let router = express.Router();

//base routing starts at /users/
// router.get( '*', (req,res)=>{res.end('hi')});

router.use( bodyParser.urlencoded( {extended: false} ) )
router.use( bodyParser.json() );

router.get( "/login:user", ( req, res ) => {
        // console.log( req.user.body )
        // console.log( req.password.body )
        res.end( 'got it' );

        //handle login
    });

// router
//     .route( "logout" )
//     .post(( req, res ) => {
//         //handle logout
//     });

module.exports = router;