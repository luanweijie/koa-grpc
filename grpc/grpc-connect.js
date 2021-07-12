const {Greeter,Health} = require('./proto')
const grpc = require('@grpc/grpc-js')

var greeterClient = new Greeter('127.0.0.1:3000', grpc.credentials.createInsecure())
var healthClient = new Health('127.0.0.1:3000', grpc.credentials.createInsecure())

function sayHello(params) {
    return new Promise(function(resolve, reject) {
        console.log('start get data...');
        greeterClient.sayHello(params, function(err, response) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(response);
            }
        })
    });
}

function health (params) {
    return new Promise(function(resolve, reject) {
        healthClient.check(params, function(err, response) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(response);
            }
        })
    });
}

module.exports = {
    sayHello: sayHello,
    health: health
}