const mongoSan = require( 'mongo-sanitize' );
const htmlSan = require( "sanitize-html");

/**
 * sanitize mongo search inputs before you perform a find
 * @param {*} s 
 * @returns 
 */
module.exports.mongo = ( s ) => {
    return mongoSan( s );
}

/**
 * clean html string from a user
 * @param {String} s Dirty string to clean
 * @param {Object} opts Options to allow tags or change rules
 * @returns 
 */
module.exports.html = ( s, opts = {} ) => {
    if( Object.entries( opts ).length === 0 )
        return htmlSan( s, {
            allowedTags: []
        } );
    else {
        return htmlSan( s, opts );
    }
}

/**
 * Cleans for mongo and removes all html
 * @param {String} s Dirty string to clean
 * @param {Object} opts Options to allow tags or change rules
 * @returns 
 */
module.exports.all = ( s, opts = {} ) => {
    let partial = this.mongo( s );
    partial = this.html( partial, opts );
    return partial;
}