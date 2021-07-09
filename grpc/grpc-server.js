const grpc = require('@grpc/grpc-js')
const health = require('grpc-health-check');
const {Greeter} = require('./proto')

const statusMap = {
    "greeter.Greeter": proto.grpc.health.v1.HealthCheckResponse.ServingStatus.SERVING,
    "": proto.grpc.health.v1.HealthCheckResponse.ServingStatus.NOT_SERVING,
};

function sayHello(call, callback) {
    callback(null, {message: 'Hello ' + call.request.name});
  }
  

const startGrpcServer = (port) => {
    var server = new grpc.Server();
    server.addService(Greeter.service, {sayHello: sayHello});

    let healthImpl = new health.Implementation(statusMap);
    server.addService(health.service, healthImpl);
    server.bindAsync(
        `127.0.0.1:${port}`,
        grpc.ServerCredentials.createInsecure(),
        (err, port) => {
            server.start();
            console.log(`grpc server started on port ${port}`)
        }
      );
}

module.exports = startGrpcServer

