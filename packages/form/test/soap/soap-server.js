var service = {
  Z_PP_ORDER_STATUS_OUT: {
    SOAPEventSource: {
      Z_PP_ORDER_STATUS_OUTOP: function(args) {
        return {
          GSTRP: args.I_GSTRP,
          MATNR: args.I_MATNR,
          ASGAM1: '294.125',
          ASGAM2: '0.000',
          CJGAM1: '0.000',
          CJGAM2: '0.000'
        }
      }
    }
  }
}

var xml = require('fs').readFileSync('./sample.wsdl', 'utf8')
var http = require('http')
var soap = require('soap')
var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')

//http server example
var server = http.createServer(function(request, response) {
  response.end('404: Not Found: ' + request.url)
})

// express server example
var app = express()
app.use(cors())

// body parser middleware are supported (optional)
app.use(
  bodyParser.raw({
    type: function() {
      return true
    },
    limit: '5mb'
  })
)
app.listen(8000, function() {
  //Note: /wsdl route will be handled by soap module
  //and all other routes & middleware will continue to work
  let server = soap.listen(app, '/wsdl', service, xml)

  server.log = function(type, data) {
    console.log('soap log', type, data)
  }
})
