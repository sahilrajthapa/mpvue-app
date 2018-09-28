//var url = 'https://phoneixredirect.herokuapp.com';
//  var url= "http://120.79.226.222"
var url = "http://localhost:3000"

var config = {
    
    api: {
         question:"/question",
         login:"/login",
         signup:"/signup",
         answer:"/answer"
    }
};

for (var key in config.api) {
    config.api[key] = url + config.api[key];
}

module.exports = config;