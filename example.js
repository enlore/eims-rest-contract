/* jshint node: true, asi: true, laxcomma: true, esversion: 6 */
'use strict'

const makeRes =  require('./index').connectPayloadFactory

let res = makeRes({
    url: "/pai/jfoise/things/390230r9",
    query: {
        name: 'farts'
    }
}, {
    data: {
        messages: [
            { id: 0, text: 'wooo' },
            { id: 1, text: 'woooooo' }
        ]
    }
}, req => {
    return {
        // query: omitSensitiveData(req.query),
        query: req.query
    }
})

console.info(res)
