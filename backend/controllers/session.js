const utils = require( '../util/utils' );
//model imports
const Session = require('../models/Session');

/**
 * creates a new session in the database if one doesn't exists it will create,
 * if one exists it will update
 * @param {String} username 
 * @param {Date} expires 
 * @returns 
 */
async function createNew( username, expires){
    try{
        let sess = await hasValidSession( username )
        // console.log( "createNew", sess )
        if( sess ){
            //update the session
            // console.log( "createNew[has]",sess )
            const expires =  utils.epochDate( 10 );
            const filter = { id: sess.id, username: sess.username };
            const update = { expires: expires };
            let doc = await Session.findOneAndUpdate( filter, update, { new: true } );
            
            // console.log( "createNew[has]", doc );
            return [ doc ];
        } else {
            const s = new Session({
                username: username,
                id: utils.generateSession( 16 ),
                expires: expires
            });
        
            let saved = await s.save()
            // console.log( 'session saved', saved );
            if( !saved ){
                console.log( 'uncaught error creating session' );
                return false;
            }
            return [ saved ];
        }
    }catch(e){
        console.error( 'failed to create session', e )
    }
}

/**
 * Checks whither there is a session for the user or the id
 * @param {String} username 
 * @param {String} id 
 * @returns 
 */
async function hasValidSession( username, id = null ){
    try{
        let search = {};
        const expiresFilter = { $gt : new Date() }
        // console.log( expiresFilter );
        if( id && username ){
            search = { id:id, username:username, expires: expiresFilter };
        } else if( id ){
            search = { id:id, expires: expiresFilter };
        } else if( username ){
            search = { username:username, expires: expiresFilter };
        } else{
            throw error;
        }
        // console.log( search );
        let find = await Session.findOne( search )
        // console.log( "I found this" )
        // console.log( find )
        //if nothing its null need to fix find being null
        if( find ){
            return find;
        }
        return false;
    } catch(e){
        console.error( 'error looking for a valid session', e );
    }
}

module.exports = {
    createNew, hasValidSession
}