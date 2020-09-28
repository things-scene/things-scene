var soap = require('soap')
var wsdl = './sample.wsdl'

var args = { I_GSTRP: '2019.04.11', I_MATNR: '2011846' }

soap.createClient(wsdl, function(err, client) {
  // let description = client.describe('Z_PP_ORDER_STATUS_OUTOP')
  // console.log('[Z_PP_ORDER_STATUS_OUTOP] : ', description)

  client.Z_PP_ORDER_STATUS_OUTOP(args, function(err, result) {
    console.log(args, result)
  })
})
