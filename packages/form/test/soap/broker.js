var express = require('express');
var app = express();

var soap = require('soap')
var wsdl = './sample.wsdl'
var soapClient
soap.createClient(wsdl, function(err, client) {
  soapClient = client
})

app.get('/Z_PP_ORDER_STATUS_OUTOP', function (req, res) {

  soapClient.Z_PP_ORDER_STATUS_OUTOP(req.query, function(err, result) {
    res.send(result)
  })
});

app.listen(8001, function () {
  console.log('Example app listening on port 8001!');
  console.log("sample. http://localhost:8001/Z_PP_ORDER_STATUS_OUTOP?I_GSTRP=2019.04.11&I_MATNR=2011846")
});

