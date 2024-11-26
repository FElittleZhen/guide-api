// 我这个模块 是定义类  还是像以往那么  const
// 我这里面  有很多的方法  整个user 板块的方法 都写再这个类当中
const {createorder,listdata,SearchOrder,SearchSold,ChaOrder,uporder,Searchadmin} = require('../service/order.service');
class CateController {
	//为什么要用async 因为node.js 异步的
	async add(ctx, next) {
		// 只有一个字段
		// catename
		const {catename} = ctx.request.body;
		
		// console.log(catename);
		if(!catename){
			ctx.body = {
				code: 201,
				message: '参数不能为空',
				data: {}
			};
			return;
		}
		
		// 唯一验证 数据库当中的catename不能重复
		const checkcate = await getCateInfo({catename});
		if(checkcate){
			ctx.body = {
				code: 201,
				message: '数据库当中已经存在当前分类',
				data: {}
			};
			return;
		}
		// 逻辑的处理 数据库的操作
		const res = await createCate(catename);
		
		//返回json数据给前端使用
		// 状态码  提示信息  数据
		ctx.body = {
			code: 0,
			message: '添加成功',
			data: {
				id: res.id
			}
		};
	}
	
	//删除操作
	async DelCate(ctx, next){
		//接受id
		const id =ctx.params.id;
		//数据库操作
		const res = await delcate(id);
		if(res){
			ctx.body = {
				code: 200,
				message: '删除成功',
				data: {}
			};
		}else{
			ctx.body = {
				code: 201,
				message: '删除失败',
				data: {}
			};
		}
		
	}
	
	
	// 单条数据查询 分类
	async OneCateData(ctx, next){
		 const {id} = ctx.params;
		 const res = await getCateInfo({id});
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
	
	//修改操作
	// 问大家一个问题  一套管控端的板块
	// 一般有几个接口 
	async changedetial(ctx, next){
		//混合传参
		const id = ctx.params.id;
		const data = ctx.request.body;
		//数据库操作
		console.log(data);
		const res = await uporder(id,data);
		if(res){
			ctx.body = {
				code: 200,
				message: '修改成功',
				data: res
			};
		}else{
			ctx.body = {
				code: 201,
				message: '修改失败',
				data: res
			};
		}
	}
	
	//cate当中最后一个接口  数据列表页
	async catelist(ctx, next){
		const { pageNum = 1, pageSize = 10 } = ctx.request.query;
		//数据库操作
		const res = await cllist(pageNum,pageSize);
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
  async list(ctx,next){
		const { pageNum = "1", pageSize = 20 ,query=''} = ctx.request.query;
		console.log("list2");
		const res = await listdata(pageNum,pageSize,query);
		ctx.body = {
			code: 200,
			message: '成功',
			data: res
		};
		
	}
    async addorder(ctx, next) {
		// 通过  ctx 上下报文  拿到我的参数
		// 我无法直接拿到参数
		// 参数的接受
		
		// 我密码需不需要  加密
		
		const data = ctx.request.body;
		// 逻辑的处理 数据库的操作
		console.log(data);
		const res = await createorder(data);

		//返回json数据给前端使用
		// 状态码  提示信息  数据
		ctx.body = {
			code: 0,
			message: '添加成功',
			data: {
				// id: res.id,
				// username: res.username
			}
		};
	}
	async getuserorder(ctx,next){
		//id参数的接收
		const goodsusername =ctx.params.username;
		const buyer=goodsusername;
		const { pageNum = "1", pageSize = 20 ,query=''} = ctx.request.query;
		console.log(goodsusername);
		//数据库操作
		const res = await SearchOrder(pageNum,pageSize,{buyer});
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
	async getusersold(ctx,next){
		//id参数的接收
		const goodsusername =ctx.params.username;
		const buyer=goodsusername;
		const { pageNum = "1", pageSize = 20 ,query=''} = ctx.request.query;
		console.log(goodsusername);
		//数据库操作
		const res = await SearchSold(pageNum,pageSize,{goodsusername});
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
	async getdetial(ctx,next){
		//id参数的接收
		const id =ctx.params.id;
		console.log("id数值为"+id);
		//数据库操作
		const res = await ChaOrder({id});
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
	async getadminorder(ctx,next){
		//id参数的接收
		const state =ctx.params.state;
		// const buyer=goodsusername;
		const { pageNum = "1", pageSize = 20 ,query=''} = ctx.request.query;
		// console.log(goodsusername);
		//数据库操作
		const res = await Searchadmin(pageNum,pageSize,{state});
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
	
	
}
//抛出  new 
module.exports = new CateController();
