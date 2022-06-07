
const express = require( 'express' );
let router = express.Router();

const postController = require( '../controllers/posts' );

//basename /users(/......)
/**
 * expects data to be posted as
 * user = username trying to login
 * password = password user trying to login 
 */
router.post( "/post", postController.post );

router.get( "/getPosts", postController.getPosts );

module.exports = router;