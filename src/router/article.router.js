/*
 * @Author: wangzhen12138 1615777455@qq.com
 * @Date: 2024-12-21 17:59:46
 * @LastEditors: wangzhen12138 1615777455@qq.com
 * @LastEditTime: 2024-12-22 17:08:46
 * @FilePath: \guide-api\src\router\article.router.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 1、引入路由
const Router =require('koa-router');
// 引入控制器的地方
const {add,DelArticle,OneArticleData,UpdateArticle,Articlelist} = require('../controller/article.controller.js');
//2、再路径当中  有一个特别的标识符  就表示我用户 下划线users 实例化对象
// prefix 
//  /users/add
// const {userValidator,verifyUser} = require('../middlewaware');
const router = new Router({prefix:'/article'});

//3、编写路由  传参方式为get  post  put  delete 组合一起 叫restful接口设计规范
// 执行的函数体 意味着一个问题 我所有的逻辑 都得写再这个函数里
router.post('/add',add);
router.get('/del/:id',DelArticle);
router.get('/getoneArticle/:id',OneArticleData);
router.put('/update/:id',UpdateArticle);
router.get('/list',Articlelist);
//4、导出
module.exports = router;

