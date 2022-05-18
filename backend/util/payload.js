const crypto = require( 'crypto');

module.exports.createJsonPayload = function createJsonPayload( s = false){
    return {
        success: s,
        payload: {

        }
    }
}

module.exports.sha256 = function( s ){
    return crypto.createHash( 'sha256' ).update( s ).digest( 'hex' );
}