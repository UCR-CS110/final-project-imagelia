const utils = require( '../util/utils' );
//model imports
const Session = require('../models/Session');

async function createNew( username, expires){
    try{
        let sess = await hasValidSession( username )
        if( sess ){
            //update the session
            console.log( sess )
            return sess;
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
            return saved;
        }
    }catch(e){
        console.error( 'failed to create session', e )
    }
    
}

async function hasValidSession( username, id = null ){
    try{
        let search = {};
        if( id && username ){
            search = {id:id, username:username };
        } else if( id ){
            search = {id:id };
        } else if( username ){
            search = { username:username };
        } else{
            throw error;
        }
        let find = await Session.find( search )
        if( find.length > 0 ){
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