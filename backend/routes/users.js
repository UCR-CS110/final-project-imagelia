
const express = require( 'express' );
let router = express.Router();

//base routing starts at /users/
// router.get( '*', (req,res)=>{res.end('hi')});


router.post( "/login", ( req, res ) => {
        
        res.send( `${req.body.user} ${req.body.password}`)

        //handle login
    });

// router
//     .route( "logout" )
//     .post(( req, res ) => {
//         //handle logout
//     });

module.exports = router;