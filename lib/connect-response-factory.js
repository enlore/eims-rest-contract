/* jshint node: true, asi: true, laxcomma: true, esversion: 6 */
'use strict'

/*
 * @param req {object} Connect style Request object
 * @param opts {object} Meta about response
 * @param paramsGenerator {function} Optional factory for creating params object
 *
 * Pass a paramsGenerator as third argument to take control of creating params
 * prop on response. Otherwise this function will just stick the req.params,
 * req.query, and req.body object right on there all willy nilly.
 */
module.exports = function connectPayloadFactory (req, opts, paramsGenerator) {
    opts = opts || {};

    let reqId        = opts.reqId;
    let id           = opts.docId;
    let lastUpdated  = opts.lastUpdated;
    let push         = opts.push;
    let start        = opts.start;
    let limit        = opts.limit;
    let data         = opts.data;
    let error        = opts.error;
    let statusCode   = opts.statusCode;
    let channel      = opts.channel;

    let resourcePath = req.url;
    let params;

    if (paramsGenerator && typeof paramsGenerator === 'function')
        params = paramsGenerator(req);

    else {
        params = {
            query: req.query,
            body: req.body,
            params: req.params
        }
    }

    // pack response object such that we don't end up with a bunch of
    // undefined props
    let response = {};

    response.timestamp = Date.now();

    // touched timestamp for entity
    if (lastUpdated !== undefined)
        response.lastUpdated = lastUpdated;

    // request lifecycle id - should
    // match on request/response pair if applicable
    if (reqId !== undefined)
        response.requestId = reqId;

    // entity id
    if (id !== undefined)
        response.id = id;

    // full path to entity on server
    if (resourcePath !== undefined)
        response.resourcePath = resourcePath;

    // flag indicates if this payload was sent from
    // server without request (i.e. a push via websocket)
    // sanitized to a bool here
    if (push !== undefined)
        response.push = push ? true : false;

    // another prop for websockets, allowing for socket listeners on the client
    // and server side to listen for messages on a given channel (string)
    if (channel !== undefined)
        response.channel = channel

    if (start)
        response.start = start;

    if (limit !== undefined)
        response.limit = limit;

    // original request body
    if (params !== undefined)
        response.params = params;

    // response payload
    if (data !== undefined)
        response.data = data;

    // response meta
    if (statusCode !== undefined)
        response.statusCode = statusCode;

    // optional error message or object
    if (error !== undefined)
        response.error = error;

    return response;
}
