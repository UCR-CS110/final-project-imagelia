const Post = require('../models/Post');
const postGenerator = require('../util/postIdGenerator.js');
const jwt = require( 'jsonwebtoken' );
const config = require( 'config' )
const SALT = config.get( 'salt');

const utils = require( '../util/utils' );
const sanitize = require( '../util/sanitizer' );

/** 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res
 * posts/getPost/SU6GLV
 */
function getPost( req, res ){
    let postId = sanitize.mongo( req.params.postId )
    //console.log(postId);
    // let postId = sanitize.mongo( req.body.postId );
    if( !postId ){
        res.json( utils.createJsonPayload( false, {'error': 'Have to input postId' }));
        return;
    }

    Post.findOne( { id: postId } ).lean().then( item => {
        item.img = 'http://localhost:8080/images/' + item.id + '.jpg';
        res.json( item );
    } )
    .catch( err => {
        if( err ) {
            res.json( utils.createJsonPayload( false ) );
        }
    });
    
}

/** 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res
 */
function getPosts(req, res) {
    let arr = [];
    Post.find().lean().then(items => {
        for( let item of items ){
            item.img = 'http://localhost:8080/images/' + item.id + '.jpg';
            arr.push( item );
        }

        res.json( utils.createJsonPayload( true, arr ) );
    });
}


/** 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res
 */
async function addComment(req, res) {
    let token = req.body.token;
    let verified = utils.verifyUserToken( token )
    if( !verified ){
        res.json( utils.createJsonPayload( false, {'error': 'Have to be signed in to comment' }));
        return;
    }
    let username = verified.displayName;
    let postId = sanitize.mongo( req.body.postId );
    let comment = sanitize.mongo( req.body.comment );

    if( !comment || !username ){
        res.json( utils.createJsonPayload( false, {'error': 'Comments can not be blank' }));
        return;
    }
    const filter = { id: postId };
    const update = { $push: { comments :{
                                    user: username,
                                    text: comment
                                } 
                            } 
                    };
    let doc = await Post.findOneAndUpdate( filter, update );
    if( doc ){
        res.json( utils.createJsonPayload( true, {username, comment, verified } ) )
    } else {
        res.json( utils.createJsonPayload( false ) )
    }
}

module.exports = {
    getPosts,
    getPost,
    addComment
};