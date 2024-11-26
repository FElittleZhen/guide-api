// sequelize 的数据类型
// 字符串  整数
const {DataTypes} = require('sequelize');
const seq = require('../db/seq');
// 第一个参数 是咱们数据表的名字  第二个是个对象  也就是咱们表当中每个字段的定义
const Order = seq.define('zd_order',{
	//id 会被咱们的sequelize 自动的创建并且维护
		goodsname:{
			type:DataTypes.STRING,
			allowNull:false,
			unique:false,
			comment:'商品名'
		},
		goodsusername:{
			type:DataTypes.STRING,
			allowNull:false,
			unique:false,
			comment:'卖家'
		},buyer:{
			type:DataTypes.STRING,
			allowNull:false,
			unique:false,
			comment:'买家'
		},
		phone:{
			type:DataTypes.STRING,
			allowNull:false,
			unique:false,
			comment:'手机号'
		},
		address:{
			type:DataTypes.STRING,
			allowNull:false,
			unique:false,
			comment:'地址'
		},
		price:{
			type:DataTypes.STRING,
			allowNull:false,
			unique:false,
			comment:'价格'
		},
		pay:{
			type:DataTypes.STRING,
			allowNull:false,
			unique:false,
			comment:'支付方式'
		},
		school:{
			type:DataTypes.STRING,
			allowNull:false,
			unique:false,
			comment:'学校'
		},
		state:{
			type:DataTypes.STRING,
			allowNull:false,
			unique:false,
			comment:'0下架,1上架'
		},
});

//comment 代表字段描述,defaultValue这个字段的默认值,type 代表数据类型
//unique 是否重复

// 通过何种方式去创建我的数据表
// 如果我数据库当中  有这个表 那么就强制删除这个表  并且从新生成一个表
// Order.sync({force:true});
// 抛出  
// 问一下  这三个字段是为什么  koa框架给你本身维护的三个字段
// 也就是说  你再创建任何一个表的时候  我不需要写这三个字段
module.exports = Order;

