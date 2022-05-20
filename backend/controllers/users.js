const sanitize = require( 'mongo-sanitize' );
const crypto = require( 'crypto' );

const user = require( '../models/User' );
const payload = require( '../util/payload' );
const User = require('../models/User');


function login( q, r ){
    let uname = sanitize( q.body.user );
    let pass = sanitize( q.body.password );
    pass = payload.sha256( pass );
    console.log( 'h' );
    user.find( { username: uname, password: pass } ).lean()
        .then( i => {
            console.log( i )
            if( i.length == 0 ){
                //send failure payload
                r.json( payload.createJsonPayload( false ) );
                r.end();
                return;
            }

            //send success payload
            r.json( payload.createJsonPayload( true ) );
            r.end();
        })
        .catch( e => {
            console.error( e );
            r.end( 'l2' );
        });
    
}


function signup( q, r ){
    let uname = sanitize( q.body.user );
    let pass = sanitize( q.body.password );
    pass = payload.sha256( pass );
    if( uname.length != 0 && pass.length != 0 ){
        const u = new User({
            username: uname,
            password: pass
        });

        u.save().then( e => {
            r.json( payload.createJsonPayload( true ) );
        });
        //were done 
        return;
    } else{
        r.json( payload.createJsonPayload( false ) );
    }
}

module.exports = {
    login,
    signup
}