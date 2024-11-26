// 1、引入路由
const Router =require('koa-router');
// 引入控制器的地方
const {addreview,reviewlist,rereview} = require('../controller/review.controller.js');
//2、再路径当中  有一个特别的标识符  就表示我用户 下划线users 实例化对象
// prefix 
//  /users/add
const router = new Router({prefix:'/review'});
 console.log("进入router");
//3、编写路由  传参方式为get  post  put  delete 组合一起 叫restful接口设计规范
// 执行的函数体 意味着一个问题 我所有的逻辑 都得写再这个函数里
router.post('/addreview',addreview);
router.get('/reviewlist/:artid',reviewlist);
router.post("/rereview",rereview); 
// router.post('/pageview/:num',PageView);
// router.all('*', async (ctx, next) => {
//   ctx.set("Access-Control-Allow-Origin", "*")
//   ctx.set("Access-Control-Allow-Headers", "X-Requested-With")
//   ctx.set("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
//   ctx.set("X-Powered-By",' 3.2.1')
//   ctx.set("Content-Type", "application/json;charset=utf-8")
//   next()
// })
//4、导出
module.exports = router;

