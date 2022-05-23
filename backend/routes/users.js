
const express = require( 'express' );
const crypto = require( 'crypto' );
let router = express.Router();

const userController = require( '../controllers/users' );
//basename /users(/......)
/**
 * expects data to be posted as
 * user = username trying to login
 * password = password user trying to login 
 */
router.post( "/login", userController.login );


/**
 * expects data to be posted as
 * user = username trying to create acc
 * password = password user trying to create acc
 */
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

module.exports = router;