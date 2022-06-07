// const sanitize = require( 'mongo-sanitize' );
const crypto = require( 'crypto' );
const jwt = require( 'jsonwebtoken' );
const config = require( 'config' )
const SALT = config.get( 'salt');

const utils = require( '../util/utils' );
const sanitize = require( '../util/sanitizer' );
const session = require('../controllers/session');
//model imports
const User = require('../models/User');
const { isArray } = require('util');

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

/**
 * handles the login action from the routers
 * @postParam user 
 * @PostParam password
 * @param {Request} q 
 * @param {import('express').Response} r 
 */
function login( q, r ){
    let uname = sanitize.mongo( q.body.user );
    let pass = q.body.password; //dont need to sanitize since it gets hashed
    pass = utils.sha256( pass );

    User.find( { username: uname, password: pass } ).lean()
        .then( i => {
            //console.log( i )
            if( i.length == 0 ){
                //send failure payload
                r.json( utils.createJsonPayload( false, { error: "Username or password is incorrect"} ) );//incorrect pass edge
                r.end();
                return;
            }

            //create a new session
            let mins = config.get( 'sessionLength' );
            let expires = utils.epochDate( mins );
            session.createNew( uname, expires ).then( (sess) => {
                // console.log( sess );
                if( isArray( sess ) ){ console.log( "ARRAY" ) }
                else{ console.log( "NOT ARRAY" ) }
                let sessId = sess[0].id;
                // console.log( sessId );
                if( sess ){
                    r.cookie( 'SESSION', sessId, { maxAge: 10 * 60000 } )
                    let returnSession = jwt.sign({
                        session: sessId,
                        username: uname
                    }, SALT );
                    r.json( utils.createJsonPayload( true, { session: returnSession } ) ); //it worked
                } else {
                    r.json( utils.createJsonPayload( false, { error: "Shit broke here. yo!" } ) );//db died edge case
                }
            });
        })
        .catch( e => {
            console.log( 'error login' );
            r.end( 'l2' );
        });

}


/**
 * handles the signup action from the routers
 * @param {Request} q 
 * @param {import('express').Response} r 
 */
async function signup( q, r ){
    //TODO data validation
    let uname = sanitize.mongo( q.body.user );
    /** DIRTY pass */
    let pass = q.body.password; //not cleaned, because will be hashed later
    
    if( uname.length != 0 && pass.length != 0 ){
        //check regex now
        if( USER_REGEX.test( uname ) && PWD_REGEX.test( pass ) ){
            let hashed = utils.sha256( pass );
            let search = { username: uname };
            //if isfound is null there is no user with that name
            let isFound = await User.findOne( search );
            if( isFound === null ){
                const u = new User({
                    username: uname,
                    password: hashed,
                    displayName: uname
                });
        
                u.save().then( e => {
                    r.json( utils.createJsonPayload( true, { 
                        msg: "User created successfully",
                        action: 'redirect',
                        href: 'users/login'
                    } ) );
                });
            } else {
                r.json( utils.createJsonPayload( false, {
                    error: "This username is already taken try a different username"
                } ) );
            }
            
            //were done 
            return;
        } else {
            //bad regex
            let err = "";
            let errors = [];
            if( USER_REGEX.test( uname ) === false ){
                let e= "Usernames must start with a letter and be 4 letters minimum and 24 letters max<br>";
                err += e;
                errors.push( e )

            }
            if( PWD_REGEX.test( pass ) === false ){
                let e1 = "Password must be at least 8 characters, include uppercase and lowercase letters, a number and a special character(Allowed: !@#$%<br>";
                err += e1;
                errors.push( e1 );
            }
            r.json( utils.createJsonPayload( false, {
                error: err,
                errors: errors,
            }))
        } 
    } else{
        r.json( utils.createJsonPayload( false, { error: 'Username and password must not be blank' } ) );
    }
}

/**
 * handles the testing action for the devs
 * TODO remove before live
 * @param {Request} q 
 * @param {import('express').Response} r 
 */
async function tester( q, r ){
    let input = sanitize.all( q.body.input );
    let validJWT = false;
    try{
        validJWT = jwt.verify( input, SALT );
    } catch( err ){
        console.log( err );
        validJWT = false;
    }
    
    if( validJWT ){
        let has = await session.hasValidSession( validJWT.username, validJWT.session );
        console.log( has );
        r.json( has );
        return;
    }
    r.json( validJWT );

}
module.exports = {
    login,
    signup,
    tester
}