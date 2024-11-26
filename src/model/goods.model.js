// sequelize 的数据类型
// 字符串  整数
const {DataTypes} = require('sequelize');
const seq = require('../db/seq');

// 第一个参数 是咱们数据表的名字  第二个是个对象  也就是咱们表当中每个字段的定义
const Goods = seq.define('zd_goods',{
	//id 会被咱们的sequelize 自动的创建并且维护
		goodsname:{
			type:DataTypes.STRING,
			allowNull:true,
			comment:'商品介绍'
		},
		content:{
			type:DataTypes.STRING,
			allowNull:true,
			comment:'商品介绍'
		},
		goodspicture:{
			type:DataTypes.CHAR,
			allowNull:true,
			comment:'商品照片'
		},
		goodsusername:{
			type:DataTypes.STRING,
			allowNull:true,
			defaultValue:0,
			comment:'卖家用户名'
		},
		cateid:{
			type:DataTypes.INTEGER,
			allowNull:true,
			defaultValue:0,
			comment:'商品分类'
		},
		pageview:{
			type:DataTypes.INTEGER,
			allowNull:true,
			defaultValue:0,
			comment:'浏览量'
		},
		price:{
			type:DataTypes.INTEGER,
			allowNull:true,
			defaultValue:0,
			comment:'原价'
		},
		newprice:{
			type:DataTypes.INTEGER,
			allowNull:true,
			defaultValue:0,
			comment:'二手价格'
		},
		school:{
			type:DataTypes.INTEGER,
			allowNull:true,
			// defaultValue:0,
			comment:'二手价格'
		},
		status:{
			type:DataTypes.BOOLEAN,
			allowNull:true,
			// defaultValue:0,
			comment:'0默认下架,1是上架'
		},


});

//comment 代表字段描述,defaultValue这个字段的默认值,type 代表数据类型
//unique 是否重复
//status 什么意义
// 记录状态  
// 文章是前端添加的  
// 删除  修改你状态（上架和下架功能） 查看文件 也就是单条查询接口 

// 通过何种方式去创建我的数据表
// 如果我数据库当中  有这个表 那么就强制删除这个表  并且从新生成一个表
// Goods.sync({force:true});
// 抛出  
// 问一下  这三个字段是为什么  koa框架给你本身维护的三个字段
// 也就是说  你再创建任何一个表的时候  我不需要写这三个字段
module.exports = Goods;
// module.exports.Op = Op;


