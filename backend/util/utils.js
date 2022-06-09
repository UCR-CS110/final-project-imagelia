const crypto = require( 'crypto');

module.exports.createJsonPayload = function createJsonPayload( s = false, data = {}){
    return {
        success: s,
        payload: data
    }
}

module.exports.sha256 = function( s ){
    return crypto.createHash( 'sha256' ).update( s ).digest( 'hex' );
}


module.exports.generateSession = function( len = 16 ) {
    // 16 bytes is likely to be more than enough,
    // but you may tweak it to your needs
    return crypto.randomBytes( len ).toString( 'hex' );
};

module.exports.epochDate = function( mins ){
    let curr = new Date();
    return new Date( curr.getTime() + ( mins * 60000 ) );
}


module.exports.verifyUserToken = function( token ){
    const jwt = require( 'jsonwebtoken' );
    const config = require( 'config' )
    const SALT = config.get( 'salt');
    try{
        let valid = jwt.verify( token, SALT );
        return valid;
    } catch( err ){
        return false;
    }
}