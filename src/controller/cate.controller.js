// 我这个模块 是定义类  还是像以往那么  const
// 我这里面  有很多的方法  整个user 板块的方法 都写再这个类当中
const {createCate,getCateInfo,delcate,udcatename,cllist} = require('../service/cate.service');
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
		// const checkcate = await getCateInfo({catename});
		// if(checkcate){
		// 	ctx.body = {
		// 		code: 201,
		// 		message: '数据库当中已经存在当前分类',
		// 		data: {}
		// 	};
		// 	return;
		// }
		// 逻辑的处理 数据库的操作
		const data={catename:catename}
		const res = await createCate(data);
		console.log(res);
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
	async UpdateCate(ctx, next){
		//混合传参
		const id = ctx.params.id;
		const data = ctx.request.body;
		//数据库操作
		const res = await udcatename(id,data);
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
	
}
//抛出  new 
module.exports = new CateController();
