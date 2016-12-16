/* jshint node: true, asi: true, laxcomma: true, esversion: 6 */
'use strict'

const makeRes =  require('./index').connectResponseFactory

// feed a connect style request object into this
let res = makeRes({
    url: "/api/jfoise/things/390230r9",
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
    // this 3rd arg is an optional callback used to mutate the req props
    // that are ultimately set on the response body
    return {
        // query: omitSensitiveData(req.query),
        query: req.query
    }
})

console.info(res)
