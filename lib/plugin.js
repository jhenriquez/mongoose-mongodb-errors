
/*
 * Adds error handling middlewares into a given schema.
 */
function ProcessMongoDBErrors(schema) {
    schema.post('error', mongodbErrorHandler);
}


function mongodbErrorHandler (error, doc, next) {

}

module.exports = ProcessMongoDBErrors;