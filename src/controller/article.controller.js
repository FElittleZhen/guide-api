// 我这个模块 是定义类  还是像以往那么  const
// 我这里面  有很多的方法  整个user 板块的方法 都写再这个类当中
const { createArticle, getArticleInfo, delArticle, udArticlename, getTabTitle,getabtitle } = require('../service/article.service');
const { createArtTab, gettablist } = require('../service/articletab.service');

class ArticleController {
	//为什么要用async 因为node.js 异步的
	async add(ctx, next) {
		const data = ctx.request.body;
		const res = await createArticle(data);
		const res2 = await createArtTab({ artTabName: data.artTabName });
		ctx.body = {
			code: 0,
			message: '添加成功',
			data: {
				id: res.id
			}
		};
	}
	async getArtTabList(ctx, next) {
		// const { pageNum = 1, pageSize = 10 } = ctx.request.query;
		//数据库操作
		console.log(1)
		const res = await gettablist();
		if (res) {
			ctx.body = {
				code: 200,
				message: '查询成功',
				data: res
			};
		} else {
			ctx.body = {
				code: 201,
				message: '查询失败',
				data: {}
			};
		}
	}
	async getTabTitle(ctx, next) {
		const data = ctx.request.body;
		const res = await getabtitle(data);
		if (res) {
			ctx.body = {
				code: 200,
				message: '查询成功',
				data: res
			};
		} else {
			ctx.body = {
				code: 201,
				message: '查询失败',
				data: {}
			};
		}
	}
	//删除操作
	async DelArticle(ctx, next) {
		//接受id
		const id = ctx.params.id;
		//数据库操作
		const res = await delArticle(id);
		if (res) {
			ctx.body = {
				code: 200,
				message: '删除成功',
				data: {}
			};
		} else {
			ctx.body = {
				code: 201,
				message: '删除失败',
				data: {}
			};
		}

	}


	// 单条数据查询 分类


	//修改操作
	// 问大家一个问题  一套管控端的板块
	// 一般有几个接口 
	async UpdateArticle(ctx, next) {
		//混合传参
		const id = ctx.params.id;
		const data = ctx.request.body;
		//数据库操作
		const res = await udArticlename(id, data);
		if (res) {
			ctx.body = {
				code: 200,
				message: '修改成功',
				data: res
			};
		} else {
			ctx.body = {
				code: 201,
				message: '修改失败',
				data: res
			};
		}
	}

	//Article当中最后一个接口  数据列表页
	// async Articlelist(ctx, next) {
	// 	const { pageNum = 1, pageSize = 10 } = ctx.request.query;
	// 	//数据库操作
	// 	const res = await cllist(pageNum, pageSize);
	// 	if (res) {
	// 		ctx.body = {
	// 			code: 200,
	// 			message: '查询成功',
	// 			data: res
	// 		};
	// 	} else {
	// 		ctx.body = {
	// 			code: 201,
	// 			message: '查询失败',
	// 			data: {}
	// 		};
	// 	}
	// }

}
//抛出  new 
module.exports = new ArticleController();
