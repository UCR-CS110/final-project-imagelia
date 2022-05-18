
const express = require( 'express' );
const crypto = require( 'crypto' );
let router = express.Router();

const userController = require( '../controllers/users' );


router.post( "/login", userController.login );

router.post( "/signup", userController.signup );

const User = require( '../models/User');
router.post( "/test", (q,r) => {
    const s = new User({
        username: 'test',
        password: crypto.createHash('sha256').update("test").digest('hex')
    });
    
    s.save().then(()=>r.end('saved'))
    r.end( crypto.createHash('sha256').update("test").digest('hex') )
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