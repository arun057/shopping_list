var itemPrice = {
  get: function(item, callback){
    var request = require('request');
    request('http://item-price.herokuapp.com/get_price?item='+item, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(body);
      }
    });
  }
}
module.exports = itemPrice;
