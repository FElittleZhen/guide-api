// 简化当前操作  进一步优化 怎么优化呢
// 数据库名  密码  用户名  能直接写死吗
// db这个模块 再哪进行使用呢  service 层进行使用

const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;



const {MYSQL_HOST,MYSQL_PORT,MYSQL_USER,MYSQL_PWD,MYSQL_DB} = require('../config/config.default');
// root
// const seq = new Sequelize('zdsc', 'root', '123456', {
//   host: 'localhost',
//   dialect: 'mysql'
// });
const seq = new Sequelize("db_mysql","root","root", {
  host:"localhost",
  dialect: 'mysql'
});
seq.authenticate().then(()=>{
	console.log('数据库链接成功')
}).catch((err)=>{
	console.log('数据库链接失败',err)
})

module.exports = seq;