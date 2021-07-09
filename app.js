const Koa = require('koa');
const app = new Koa();
const static = require('koa-static');
const views = require('koa-views')
const index = require('./index')
const startGrpcServer = require('./grpc-server')

var server = app.listen(3000, () => {
  var host = server.address().address;
  var port = server.address().port;
  startGrpcServer(port)
  console.log('app listening at http://%s:%s', host, port);
});

app.use(static(__dirname + '/public'));
app.use(views(__dirname + '/views'));
app.use(index.routes(), index.allowedMethods())
