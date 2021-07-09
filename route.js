var grpcClient = require('./grpc/grpc-connect');
const router = require('koa-router')()

router.get("/", async(ctx, next) => {
    await ctx.render('index');
})

router.get('/SayHello', async(ctx, next) => {
    var params = { name: "john" };
    var json = await grpcClient.sayHello(params);
    ctx.body = json;
});
//https://github.com/grpc/grpc/blob/master/doc/health-checking.md
router.get('/Health', async(ctx, next) => {
    var params = { service: "greeter.Greeter" };
    var json = await grpcClient.health(params);
    ctx.body = json;
});

module.exports = router;