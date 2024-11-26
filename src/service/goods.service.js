// class类库  针对所有的user板块的 增删改查操作
const Goods = require('../model/goods.model');
// const Op= require('../model/goods.model');
const Cate = require('../model/cate.model');
const { Sequelize } = require('sequelize');

class goodsService {
	async createarticle(ctxbody) {
		// 写咱们增删改查的地方  增
		console.log(ctxbody);
		// goodspicture:ctxbody.goodspicture
		const res = await Goods.create({ goodsname: ctxbody.goodsname, content: ctxbody.goodscontent, cateid: ctxbody.cateid, status: ctxbody.status, goodsusername: ctxbody.goodsusername, });
		console.log("create success")
		console.log(res);
		// 这是一个32位 不规则的字符串
		// e10adc3949ba59abbe56e057f20f883e
		return res.dataValues;
	}

	async listdata(pageNum, pageSize) {
		const offset = (pageNum - 1) * pageSize;
		// 设置关联条件
		// Goods.belongsTo(Cate, {
		// 	// 我主表的关联字段是哪个
		//   foreignKey: 'cateid',
		//   targetKey: 'id',
		// });
		console.log("1");
		const { rows, count } = await Goods.findAndCountAll({
			// 查表当中的哪些字段的
			attributes: ['id', 'goodsname', 'content', 'goodspicture', 'goodsusername', 'cateid', 'pageview', 'price', 'newprice', 'school', 'status', 'cateid', 'createdAt'],
			// attributes: [ 'goodsname','content'],
			// include: [{
			//     attributes: ['catename'],
			//     model: Cate,
			//   },
			// ],
			where: { status: "0" },
			offset: offset,
			limit: pageSize * 1
		});
		console.log("1");
		return {
			pageNum,
			pageSize,
			total: count,
			list: rows,
		};
	}

	async SearchArticle(pageNum, pageSize, { id, title, content, status, cateid, pageview, goodsusername }) {
		const offset = (pageNum - 1) * pageSize;
		// 设置关联条件
		Goods.belongsTo(Cate, {
			// 我主表的关联字段是哪个
			foreignKey: 'cateid',
			targetKey: 'id',
		});

		const whereOpt = {}
		id && Object.assign(whereOpt, { id })
		title && Object.assign(whereOpt, { title })
		content && Object.assign(whereOpt, { content })
		status && Object.assign(whereOpt, { status })
		cateid && Object.assign(whereOpt, { cateid })
		pageview && Object.assign(whereOpt, { pageview })
		goodsusername && Object.assign(whereOpt, { goodsusername })
		console.log(whereOpt);
		const { rows, count } = await Goods.findAndCountAll({
			// 查表当中的哪些字段的
			attributes: ['id', 'goodsname', 'content', 'goodspicture', 'status', 'cateid', 'createdAt', 'goodsusername', 'pageview', 'price'],
			where: whereOpt,
			include: [{
				attributes: ['cateid'],
				model: Cate,
			},
			],
			offset: offset,
			limit: pageSize * 1
		});

		return {
			pageNum,
			pageSize,
			total: count,
			list: rows,
		};
	}

	async deletenews(id) {
		console.log("进入serve");
		const res = await Goods.destroy({ where: { id } });
		console.log("删除结果为" + res);
		return res > 0 ? true : false;
	}

	async ChaArticle({ id, goodsname, content, status, cateid, pageview, goodsusername }) {
		const whereOpt = {}
		id && Object.assign(whereOpt, { id })
		goodsname && Object.assign(whereOpt, { goodsname })
		content && Object.assign(whereOpt, { content })
		status && Object.assign(whereOpt, { status })
		cateid && Object.assign(whereOpt, { cateid })
		pageview && Object.assign(whereOpt, { pageview })
		goodsusername && Object.assign(whereOpt, { goodsusername })
		const res = await Goods.findOne({
			attributes: ['id', 'goodsname', 'content', 'status', 'cateid', 'pageview', 'goodsusername', 'price', 'newprice', 'school'],
			where: whereOpt,
		})
		// 查不到的情况下  咱们直接返回为空即可
		return res ? res.dataValues : null;
	}
	// 	async ChaArticle({id}){
	// 	const whereOpt = {}
	// 	id && Object.assign(whereOpt, {id})
	// 	const res = await Article.findOne({
	// 				attributes: ['id','title','content','status','cateid'],
	// 				where: whereOpt,
	// 			})
	// 	// 查不到的情况下  咱们直接返回为空即可
	// 	return res ? res.dataValues : null;
	// }

	async SetStatus(id, data) {
		//console.log("开始更新");
		const res = await Goods.update(data, { where: { id } });
		return res[0] > 0 ? true : false;
	}
	async Chalike(data) {
		// alert(data)
		console.log(data)
		const whereOpt = {}
		const content = data.content;
		const region = data.region;
		const goodsname = data.content
		const cateid = data.cateid;
		const goodsusername = data.goodsusername;
		console.log(content);
		goodsname && Object.assign(whereOpt, {
			content
		})
		
		content && Object.assign(whereOpt, {
			content
		})
		
		cateid && Object.assign(whereOpt, {
			content
		})
		goodsusername && Object.assign(whereOpt, {
			content
		})
		const res = await Goods.findOne({
			attributes: ['id', 'goodsname', 'content', 'status', 'cateid', 'pageview', 'goodsusername', 'price', 'newprice', 'school'],
			where: whereOpt,
		})
		console.log(res)
		// 查不到的情况下  咱们直接返回为空即可
		return res ? res.dataValues : null;
	}

}

module.exports = new goodsService();