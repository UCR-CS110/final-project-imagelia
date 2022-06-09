
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

router.post( "/test", userController.tester );

router.post("/changeName", userController.changeName);

module.exports = router;