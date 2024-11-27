// 1、引入路由
const Router = require('koa-router');
// 引入控制器的地方
const { add, login, DleteUser, OneUserData, UpdateUser, UserList, GetInfor, LogOut, searchinfo, updateinfo, GetOtherInfor } = require('../controller/user.controller.js');
//2、再路径当中  有一个特别的标识符  就表示我用户 下划线users 实例化对象
// prefix 
//  /users/add
const { userValidator, verifyUser } = require('../middleware/user.middleware');
const router = new Router({ prefix: '/users' });

//3、编写路由  传参方式为get  post  put  delete 组合一起 叫restful接口设计规范
// 执行的函数体 意味着一个问题 我所有的逻辑 都得写再这个函数里
router.post('/add', add);
// router.post('/add',userValidator,verifyUser,add);
router.post('/login', login);
router.delete('/deluser/:id', DleteUser);
router.get('/userdata/:id', OneUserData);
router.put('/updateuser/:id', UpdateUser);
router.get('/userlist', UserList);
router.put('/getinfor/:token', GetInfor);
router.put('/getotherinfor', GetOtherInfor);
router.post('/logout', LogOut);
router.put('/searchinfo/:token', searchinfo);
router.put('/updateinfo/:token', updateinfo);

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

