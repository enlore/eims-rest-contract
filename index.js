/* jshint node: true, asi: true, laxcomma: true, esversion: 6 */
'use strict'

/**
 * This file surfaces the various response factories available via this
 * module (of which there is only one right now).
 */

const connectResponseFactory = require('./lib/connect-payload-factory.js');

module.exports.connectResponseFactory = connectResponseFactory;
