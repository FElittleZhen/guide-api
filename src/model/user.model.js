// sequelize 的数据类型
// 字符串  整数
const {DataTypes} = require('sequelize');
const seq = require('../db/seq');
// 第一个参数 是咱们数据表的名字  第二个是个对象  也就是咱们表当中每个字段的定义
const User = seq.define('zd_user',{
	//id 会被咱们的sequelize 自动的创建并且维护
		username:{
			type:DataTypes.STRING,
			allowNull:false,
			unique:true,
			comment:'用户名,唯一字段'
		},
		password:{
			type:DataTypes.CHAR(64),
			allowNull:false,
			comment:'密码'
		},
		is_admin:{
			type:DataTypes.STRING,			
			allowNull:false,
			defaultValue:0,
			comment:'是否为管理员 0用户 1是管理员 '
		}
		,token:{
			type:DataTypes.STRING.BINARY,
			allowNull:false,
			defaultValue:"",
			comment:'token令牌'
		},phone:{
			type:DataTypes.STRING,
			allowNull:true,
			// unique:true,
			defaultValue:0,

			comment:'手机号'
		},wx:{
			type:DataTypes.STRING,
			allowNull:true,
			defaultValue:0,
			
			// unique:true,
			comment:'手机号'
		},emial:{
			type:DataTypes.STRING,
			allowNull:true,
			defaultValue:0,
			
			// unique:true,
			comment:'手机号'
		},school:{
			type:DataTypes.STRING,
			allowNull:true,
			defaultValue:0,
			
			// unique:true,
			comment:'手机号'
		},
});

//comment 代表字段描述,defaultValue这个字段的默认值,type 代表数据类型
//unique 是否重复

// 通过何种方式去创建我的数据表
// 如果我数据库当中  有这个表 那么就强制删除这个表  并且从新生成一个表
// User.sync({force:true});
// 抛出  
// 问一下  这三个字段是为什么  koa框架给你本身维护的三个字段
// 也就是说  你再创建任何一个表的时候  我不需要写这三个字段
module.exports = User;

