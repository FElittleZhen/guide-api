// 我这个模块 是定义类  还是像以往那么  const
// 我这里面  有很多的方法  整个user 板块的方法 都写再这个类当中
const jwt = require('jsonwebtoken');
const {getotherUserInfo,logoutUser,createUser,getUserInfo,DelteUsers,UpdateUser,Listdata,getUsertoken,LogOut,SetStatus,Updateinfo} = require('../service/user.service');
const md5 = require('md5');
class UserController {
	//为什么要用async 因为node.js 异步的
	async add(ctx, next) {
		// 通过  ctx 上下报文  拿到我的参数
		// 我无法直接拿到参数
		// 参数的接受
		
		// 我密码需不需要  加密
		
		const {username,password} = ctx.request.body;
		// 逻辑的处理 数据库的操作
		console.log(username,password);
		const res = await createUser(username, password);
		console.log(res);
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
	
	//后台管控端的接口  登录
	// username  password
	async login(ctx, next){
		console.log(ctx.request.body);
		const {username,password} = ctx.request.body;
		//检查一下 我数据库当中存在不存在这个用户啊
		const res = await getUserInfo({username});
		console.log("res"+res);
		const token=jwt.sign({username,password}, "secret", { expiresIn: 3600 })
		const data={
			username:username,
			// password:md5(password),
			token:token
		}
		
		
		if(!res){
			ctx.body = {
					code: 200,
					message: '登录失败',
				
				};
		}
		if(res){
			const upres = await UpdateUser(res.id,data);
			if(upres){
				console.log("更新成功") 
			}
			//我数据库当中存在着这个用户 执行以下操作
			// 密码是否正确 == 但是我数据库的密码是加密的
			if(md5(password) == res.password){
				console.log("dlcg");
				ctx.body = {
					code: 200,
					message: '登录成功',
					data: res,
					token : token
				};
			}else{
				ctx.body = {
					code: 200,
					message: '密码错误，但是用户名正确',
					data: {}
				};
			}
		}else{
			// 没有这个用户 我直接返回错误信息
			ctx.body = {
				code: 201,
				message: '数据库没有这个用户，用户查找失败',
				data: {}
			};
		}
	}
	
	// 用户的删除操作
	// 我删除用户的时候  需不需要id
	// 并且我应该用什么传参方式去定义
	// 专门针对的就是删除的方法
	// delete 方式去定义我的 get post  put delete
	async DleteUser(ctx, next){
		// 解析参数  也就是我要获取到我id的这个参数
		const {id} = ctx.params;
		//数据库操作 也就是咱们的service 层操作
		const res = await DelteUsers(id);
		if(res){
			//删除成功
			ctx.body = {
				code: 200,
				message: '删除成功',
				data: {}
			};
		}else{
			//删除失败
			ctx.body = {
				code: 201,
				message: '删除失败',
				data: {}
			};
		}
	}
	
	
	// 修改接口
	// 我但凡是修改  我都需要先查出这条数据
	// 数据单条查询的接口
	// 为什么有的地方 ctx.params;  ctx.request.body;
	// 哪种传参 需要
	async OneUserData(ctx, next){
		const {id} = ctx.params;
		const res = await getUserInfo({id});
		console.log(res);
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
	
	//修改用户接口  用户名  密码
	// restful接口设计的时候 修改操作 针对的是哪种传参方式
	async UpdateUser(ctx, next){
		// 我需要id  我通过地址这块传参
		// json的那种传参 {username:username,password:password}
		// 组合式传参方法
		const id = ctx.params.id;
		// 地址栏当中看不见了 修改的密码也是需要加密的
		ctx.request.body.password = md5(ctx.request.body.password);
		const data = ctx.request.body;
		//数据库操作  也就是数据库修改操作
		const res = await UpdateUser(id,data);
		if(res){
			//修改成功
			ctx.body = {
				code: 200,
				message: '修改成功',
				data: {}
			};
		}else{
			// 修改失败
			ctx.body = {
				code: 201,
				message: '修改失败',
				data: {}
			};
		}
	}
	
	
	// 多条查询数据  也就是咱们管控端的列表数据 list
	async UserList(ctx, next){
		// 带分页的操作  参数里面相当于  我给你默认值
		// 第一页  
		const { pageNum = 1, pageSize = 10 } = ctx.request.query;
		// 数据库查询操作
		const res = await Listdata(pageNum,pageSize);
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
	async GetOtherInfor(ctx, next){
		const data = ctx.request.body;
		const token = ctx.params;
		//检查一下 我数据库当中存在不存在这个用户啊
		const res = await getotherUserInfo(data.goodsusername);
		//const result = jwt.verify(token, secret);
			if(res){
				ctx.body = {
					code: 200,
					message: 'token验证成功',
					data: res,
					token : res.token
				};
			}else{
				ctx.body = {
					code: 201,
					message: 'token过期请重新登录',
					data: {}
				};
			}
			
		
	}
	async GetInfor(ctx, next){
		const data = ctx.request.body;
		const token = ctx.params;
		console.log(data,token);
		//检查一下 我数据库当中存在不存在这个用户啊
		const res = await getUserInfo(data.id);
		console.log("token"+token);
		//const result = jwt.verify(token, secret);
		if(1){
			if(res){
				ctx.body = {
					code: 200,
					message: 'token验证成功',
					data: res,
					token : res.token
				};
			}else{
				ctx.body = {
					code: 201,
					message: 'token过期请重新登录',
					data: {}
				};
			}
		}
		else{
			ctx.body = {
					code: 200,
					message: 'token过期',
					data: res,
					token : res.token
				};
		}
			
		
	}
	async searchinfo(ctx, next){
		const data = ctx.request.body;
		const token = ctx.params;
		console.log(data,token);
		//检查一下 我数据库当中存在不存在这个用户啊
		const res = await getUserInfo(data.id);
		console.log("查询用户信息"+res);
		//const result = jwt.verify(token, secret);
		if(1){
			if(res){
				ctx.body = {
					code: 200,
					message: 'token验证成功',
					data: res,
					token : res.token
				};
			}else{
				ctx.body = {
					code: 201,
					message: 'token过期请重新登录',
					data: {}
				};
			}
		}
		else{
			ctx.body = {
					code: 200,
					message: 'token过期',
					data: res,
					token : res.token
				};
		}
			
		
	}
	async updateinfo(ctx, next){
		const data = ctx.request.body;
		const token = ctx.params;
		console.log(data,token);
		const id = data.id;
		//检查一下 我数据库当中存在不存在这个用户啊
		const res = await Updateinfo(data,token);
		if(res){
			//修改成功
			ctx.body = {
				code: 200,
				message: '修改成功',
				data: {}
			};
		}else{
			// 修改失败
			ctx.body = {
				code: 201,
				message: '修改失败',
				data: {}
			};
		}
			
		
	}
	// user  cate   article

	async LogOut(ctx, next){
		let data = ctx.request.body;
		const id=data.id;
		
		//数据库操作  也就是数据库修改操作
		console.log(data);
		const res = await logoutUser(id,data);
		if(res){
			//修改成功
			ctx.body = {
				code: 200,
				message: '修改成功',
				data: {}
			};
		}else{
			// 修改失败
			ctx.body = {
				code: 201,
				message: '修改失败',
				data: {}
			};
		}
	}
	
}

//抛出  new 
module.exports = new UserController();
