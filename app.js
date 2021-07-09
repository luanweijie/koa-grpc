const Koa = require('koa');
const app = new Koa();
const static = require('koa-static');
const views = require('koa-views')
const route = require('./route')
const startGrpcServer = require('./grpc/grpc-server')

var server = app.listen(3000, () => {
  var port = server.address().port;
  startGrpcServer(port)
  console.log('app listening at http://localhost:%s', port);
});

app.use(static(__dirname + '/public'));
app.use(views(__dirname + '/views'));
app.use(route.routes(), route.allowedMethods())
