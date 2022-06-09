
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

// router.post( "/test", userController.tester );

router.post("/changeName", userController.changeName);

const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client( '485873337875-uo1k50ettmv1isu7ell7esqbmmpsi47l.apps.googleusercontent.com')
router.post("/users/api/google-login", async (req, res) => {
    console.log( 'here?')
    const { token }  = req.body
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: '485873337875-uo1k50ettmv1isu7ell7esqbmmpsi47l.apps.googleusercontent.com'
    });
    const { name, email, picture } = ticket.getPayload();    
    console.log( { name, email, picture } );
    // const user = await db.user.upsert({ 
    //     where: { email: email },
    //     update: { name, picture },
    //     create: { name, email, picture }
    // })

    req.session.userId = user.id

    console.log( )

    res.status(201)
    res.json(user)
})

module.exports = router;