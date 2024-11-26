// sequelize 的数据类型
// 字符串  整数
const {DataTypes} = require('sequelize');
const seq = require('../db/seq');
// 第一个参数 是咱们数据表的名字  第二个是个对象  也就是咱们表当中每个字段的定义
const Review = seq.define('zd_review',{
	//id 会被咱们的sequelize 自动的创建并且维护
		artid:{
			type:DataTypes.STRING,
			allowNull:true,
			comment:'文章标记'
		},
		reviewname:{
			type:DataTypes.STRING,
			allowNull:true,
			comment:'评论的用户名'
		},
		reviewcontent:{
			type:DataTypes.STRING,
			allowNull:true,
			comment:'评论内容'
		},
		reviewid:{
			type:DataTypes.STRING,
			allowNull:true,
			comment:'评论内容'
		}
		
});

//comment 代表字段描述,defaultValue这个字段的默认值,type 代表数据类型
//unique 是否重复

// 通过何种方式去创建我的数据表
// 如果我数据库当中  有这个表 那么就强制删除这个表  并且从新生成一个表
// Review.sync({force:true});//
// 抛出  
// 问一下  这三个字段是为什么  koa框架给你本身维护的三个字段
// 也就是说  你再创建任何一个表的时候  我不需要写这三个字段
module.exports = Review;

