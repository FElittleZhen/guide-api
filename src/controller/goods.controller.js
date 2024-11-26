const { listdata, deletenews, ChaArticle, SetStatus, createarticle, SearchArticle, Chalike } = require('../service/goods.service');
class goodsController {
	async add(ctx, next) {
		const ctxbody = ctx.request.body;
		const res = await createarticle(ctxbody);
		ctx.body = {
			code: 0,
			message: '添加成功',
			data: {
				id: res.id,
				username: res.username
			}
		};
	}
	async PageView(ctx, next) {
		const id = ctx.params.id;
		const data = ctx.request.body;
		//数据库操作
		const res = await SetStatus(id, data);
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
				data: {}
			};
		}
	}
	async list(ctx, next) {
		const { pageNum = "1", pageSize = 20, query = '' } = ctx.request.query;
		console.log("list2");
		const res = await listdata(pageNum, pageSize, query);
		ctx.body = {
			code: 200,
			message: '成功',
			data: res
		};

	}

	async delgood(ctx, next) {
		const id = ctx.params.id;
		//数据库操作 
		const res = await deletenews(id);
		if (res) {
			ctx.body = {
				code: 200,
				message: '删除成功',
				data: res
			};
		} else {
			ctx.body = {
				code: 201,
				message: '删除失败',
				data: {}
			};
		}
	}
	async delarticle(ctx, next) {
		const id = ctx.params.id;
		//数据库操作 
		const res = await deletenews(id);
		if (res) {
			ctx.body = {
				code: 200,
				message: '删除成功',
				data: res
			};
		} else {
			ctx.body = {
				code: 201,
				message: '删除失败',
				data: {}
			};
		}
	}
	//单条数据的查找操作

	async userArtList(ctx, next) {
		//id参数的接收
		const goodsusername = ctx.params.username;
		const { pageNum = "1", pageSize = 20, query = '' } = ctx.request.query;
		console.log(goodsusername);
		//数据库操作
		const res = await SearchArticle(pageNum, pageSize, { goodsusername });

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


	async ArticleOneData(ctx, next) {
		//id参数的接收
		const id = ctx.params.id;
		console.log("id数值为" + id);
		//数据库操作
		const res = await ChaArticle({ id });
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


	//文章修改接口  上架和下架呢
	async updateStatus(ctx, next) {
		const id = ctx.params.id;
		const data = ctx.request.body;
		//数据库操作
		const res = await SetStatus(id, data);
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
				data: {}
			};
		}
	}

	async outoffgoods(ctx, next) {
		const id = ctx.params.id;
		console.log(id)
		//数据库操作
		const res = await SetStatus(id, { status: "1" });
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
				data: {}
			};
		}
	}
	async ongoods(ctx, next) {
		const id = ctx.params.id;
		console.log(id)
		//数据库操作
		const res = await SetStatus(id, { status: "0" });
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
				data: {}
			};
		}
	}

	async searchlike(ctx, next) {
		//id参数的接收
		const data = ctx.request.body;
		console.log(data);
		//数据库操作
		const res = await Chalike(data);
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
}
//抛出  new 
module.exports = new goodsController();
