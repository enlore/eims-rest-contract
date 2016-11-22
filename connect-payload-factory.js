/* jshint node: true, asi: true, laxcomma: true, esversion: 6 */
'use strict'

module.exports = function connectPayloadFactory (req, opts) {
    opts = opts || {};

    let reqId       = opts.reqId;
    let id          = opts.docId;
    let lastUpdated = opts.lastUpdated;
    let push        = opts.push;
    let start       = opts.start;
    let limit       = opts.limit;
    let params      = opts.params;
    let data        = opts.data;

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
      resourcePath: req.url,

      // flag indicates if this payload was sent from
      // server without request
      push: push || false,

      start: start,
      limit: limit,

      // original request body
      params: params,

      // response payload
      data: data
    }
}
