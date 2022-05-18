const user = require( '../models/User' );
const payload = require( '../util/payload' );

function login( q, r ){
    let uname = q.body.user;
    let pass = q.body.password;
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

module.exports = {
    login
}