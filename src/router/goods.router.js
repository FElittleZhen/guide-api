// 1、引入路由
const Router =require('koa-router');
// 引入控制器的地方
const {list,delarticle,ArticleOneData,updateStatus,add,PageView,userArtList,outoffgoods,searchlike,ongoods,delgood} = require('../controller/goods.controller.js');
//2、再路径当中  有一个特别的标识符  就表示我用户 下划线users 实例化对象
// prefix 
//  /users/add
// const {userValidator,verifyUser} = require('../middlewaware');
const router = new Router({prefix:'/article'});

//3、编写路由  传参方式为get  post  put  delete 组合一起 叫restful接口设计规范
// 执行的函数体 意味着一个问题 我所有的逻辑 都得写再这个函数里

router.get('/list',list);
router.delete('/del/:id',delarticle);
router.get('/art/:id',ArticleOneData);
router.put('/update/:id',updateStatus);
router.post('/add',add);
router.put('/addpageview/:id',PageView);
router.get('/userart/:username',userArtList);
router.get('/outoffgoods/:id',outoffgoods);
router.get('/ongoods/:id',ongoods);
router.post('/search',searchlike);
router.get('/del/:id',delgood);


//4、导出
module.exports = router;

