// 我这个模块 是定义类  还是像以往那么  const
// 我这里面  有很多的方法  整个user 板块的方法 都写再这个类当中
const jwt = require('jsonwebtoken');
const {createreview,SearchReview,SearchReviewId,createRereview} = require('../service/review.service');
const md5 = require('md5');
class UserController {
	//为什么要用async 因为node.js 异步的
	async addreview(ctx, next) {

		// 通过  ctx 上下报文  拿到我的参数
		// 我无法直接拿到参数
		// 参数的接受
		// 我密码需不需要  加密
		const {artid,reviewid,reviewname,reviewcontent}=ctx.request.body;
		console.log("进入控制层")
		// 逻辑的处理 数据库的操作
		const res = await createreview({artid,reviewid,reviewname,reviewcontent});

		//返回json数据给前端使用
		// 状态码  提示信息  数据
		ctx.body = {
			code: 0,
			message: '添加成功',
			data: {
				id: res.id,
				username: res.username
			}
		};
	}
	async reviewlist(ctx,next){
		//id参数的接收
		const artid =ctx.params.artid;
		const { pageNum = "1", pageSize = 20 ,query=''} = ctx.request.query;
		console.log(artid);
		//数据库操作
		const res = await SearchReview(pageNum,pageSize,{artid});
		console.log(res.list);
		for(let i=0;i<res.list.length;i++){
			console.log("进入循环");
			console.log(res.list[i].dataValues.id);
		const reres = await	SearchReviewId(res.list[i].dataValues.id);
		res.list[i].dataValues.list=reres;
		}
		if(res){
			ctx.body = {
				code: 200, 
				message: '查询成功',
				data: res
			};
		}else{
			ctx.body = {
				code: 201,
				message: '查询失败',
				data: {}
			};
		}
	}
		async rereview(ctx, next) {

		// 通过  ctx 上下报文  拿到我的参数
		// 我无法直接拿到参数
		// 参数的接受
		// 我密码需不需要  加密
		const {reviewid,reviewname,reviewcontent}=ctx.request.body;
		console.log("进入控制层")
		// 逻辑的处理 数据库的操作
		const res = await createreview({reviewid,reviewname,reviewcontent});

		//返回json数据给前端使用
		// 状态码  提示信息  数据
		ctx.body = {
			code: 0,
			message: '添加成功',
			data: {
				id: res.id,
				username: res.username
			}
		};
	}
	
	
	
}

//抛出  new 
module.exports = new UserController();
