const sanitize = require( 'mongo-sanitize' );
const crypto = require( 'crypto' );

const utils = require( '../util/utils' );
const session = require('../controllers/session');
//model imports
const User = require('../models/User');


/**
 * handles the login action from the routers
 * @param {Request} q 
 * @param {import('express').Response} r 
 */
function login( q, r ){
    let uname = sanitize( q.body.user );
    let pass = sanitize( q.body.password );
    pass = utils.sha256( pass );

    User.find( { username: uname, password: pass } ).lean()
        .then( i => {
            //console.log( i )
            if( i.length == 0 ){
                //send failure payload
                r.json( utils.createJsonPayload( false ) );
                r.end();
                return;
            }



            //create a new session
            let expires = utils.epochDate( 10 );
            session.createNew( uname, expires ).then( (sess) => {
                let sessId = sess[0].id;
                console.log( sessId );
                if( sess ){
                    r.cookie( 'SESSION', sessId, {maxAge: 10 * 60000})
                    r.json( utils.createJsonPayload( true ) );
                } else {
                    r.json( utils.createJsonPayload( false ) );
                }
                
            });
            
            
        })
        .catch( e => {
            console.log( 'error login' );
            //console.error( e );
            r.end( 'l2' );
        });
    
}


/**
 * handles the signup action from the routers
 * @param {Request} q 
 * @param {import('express').Response} r 
 */
function signup( q, r ){
    let uname = sanitize( q.body.user );
    let pass = sanitize( q.body.password );
    pass = utils.sha256( pass );
    if( uname.length != 0 && pass.length != 0 ){
        const u = new User({
            username: uname,
            password: pass
        });

        u.save().then( e => {
            r.json( utils.createJsonPayload( true ) );
        });
        //were done 
        return;
    } else{
        r.json( utils.createJsonPayload( false ) );
    }
}

module.exports = {
    login,
    signup
}