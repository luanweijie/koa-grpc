const path = require('path')
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

const GREETER_PROTO_PATH = path.join(__dirname, '../proto/greeter.proto')
const greeterPackageDefinition = protoLoader.loadSync(GREETER_PROTO_PATH, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true })
const greeterProtoDescriptor = grpc.loadPackageDefinition(greeterPackageDefinition)

const greeter_proto = greeterProtoDescriptor.greeter.Greeter


const HEALTH_PROTO_PATH_HEALTH_ = path.join(__dirname, '../proto/health.proto')
const healthPackageDefinition = protoLoader.loadSync(HEALTH_PROTO_PATH_HEALTH_, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true })
const healthProtoDescriptor = grpc.loadPackageDefinition(healthPackageDefinition)

const health_proto = healthProtoDescriptor.grpc.health.v1.Health

module.exports = {
    Greeter: greeter_proto,
    Health: health_proto
}