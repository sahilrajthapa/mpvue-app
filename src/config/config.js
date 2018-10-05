 var url= "http://120.79.226.222"
// var url = "http://localhost:3000"
// var url="http://10.0.2.2:3000"

var config = {
    api: {
         question:"/question",
         login:"/login/v2",
         signup:"/v2/signup",
         answer:"/answer",
         sugPress: "/sugpress"
    }
};

for (var key in config.api) {
    config.api[key] = url + config.api[key];
}

module.exports = config;
