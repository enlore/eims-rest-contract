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

    return {
      timestamp: Date.now(),

      // touched timestamp for entity
      lastUpdated: lastUpdated,

      // request lifecycle id - should 
      // match on request/response pair if applicable
      requestId: reqId,

      // entity id
      id: id,

      // full path to entity on server
      resourcePath: resourcePath,

      // flag indicates if this payload was sent from
      // server without request (i.e. a push via websocket)
      push: push || false,

      start: start,
      limit: limit,

      // original request body
      params: params,

      // response payload
      data: data
    }
}
