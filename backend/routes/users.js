
const express = require( 'express' );
let router = express.Router();

const userController = require( '../controllers/users' );


router.post( "/login", userController.login );

const User = require( '../models/User');
router.post( "/test", (q,r) => {
    const s = new User({
        username: 'test',
        password: 'test'
    });
    s.save().then(()=>r.end('saved'))
});


/*( req, res ) => {
        
        res.send( `${req.body.user} ${req.body.password}`)

        //handle login
    });
*/

// router
//     .route( "logout" )
//     .post(( req, res ) => {
//         //handle logout
//     });

module.exports = router;