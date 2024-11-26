// class类库  针对所有的user板块的 增删改查操作
const Order = require('../model/order.model');
const md5 = require('md5');
class UserService {
	async createorder(data) {
		// 写咱们增删改查的地方  增
		console.log("进入serve")
		console.log("**************" + data);
		
		const res = await Order.create({goodsname:data.goodsname,goodsusername:data.goodsusername,buyer:data.buyer,phone:data.phone,address:data.address,price:data.price,pay:data.pay,school:data.school,state:data.state,});
		// {goodsname:data.goodsname}
		console.log("122211132233");

		// console.log(res);
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
		const { rows, count } = await Order.findAndCountAll({
			// 查表当中的哪些字段的
			attributes: ['id', 'goodsname', 'goodsusername', 'buyer', 'price'],
			// attributes: [ 'goodsname','content'],
			// include: [{
			//     attributes: ['catename'],
			//     model: Cate,
			//   },
			// ],
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
	async SearchOrder(pageNum, pageSize, { buyer }) {
		const offset = (pageNum - 1) * pageSize;
		// 设置关联条件
		const whereOpt = {}
		console.log("111");
		buyer && Object.assign(whereOpt, { buyer })
		console.log(whereOpt);
		const { rows, count } = await Order.findAndCountAll({
			// 查表当中的哪些字段的
			attributes: ['id', 'goodsname', 'goodsusername', 'buyer', 'phone', 'address', 'price', 'pay'],
			where: whereOpt,
			offset: offset,
			limit: pageSize * 1
		});
		console.log("hhh");
		return {
			pageNum,
			pageSize,
			total: count,
			list: rows,
		};
	}
	async SearchSold(pageNum, pageSize, { goodsusername }) {
		const offset = (pageNum - 1) * pageSize;
		// 设置关联条件
		const whereOpt = {}
		console.log("111");
		goodsusername && Object.assign(whereOpt, { goodsusername })
		console.log(whereOpt);
		const { rows, count } = await Order.findAndCountAll({
			// 查表当中的哪些字段的
			attributes: ['id', 'goodsname', 'goodsusername', 'buyer', 'phone', 'address', 'price', 'pay'],
			where: whereOpt,
			offset: offset,
			limit: pageSize * 1
		});
		console.log("hhh");
		return {
			pageNum,
			pageSize,
			total: count,
			list: rows,
		};
	}
	async ChaOrder({id,goodsname,content,status,cateid,pageview,goodsusername}){
		const whereOpt = {}
		id && Object.assign(whereOpt, {id})
		goodsname && Object.assign(whereOpt, {goodsname})
		content && Object.assign(whereOpt, {content})
		status && Object.assign(whereOpt, {status})
		cateid && Object.assign(whereOpt, {cateid})
		pageview && Object.assign(whereOpt, {pageview})
		goodsusername && Object.assign(whereOpt, {goodsusername})
		const res = await Order.findOne({
					attributes: ['id', 'goodsname', 'goodsusername', 'buyer', 'phone', 'address', 'price', 'pay','state'],
					where: whereOpt,
				})
		// 查不到的情况下  咱们直接返回为空即可
		return res ? res.dataValues : null;
	}
	async uporder(id,state){
		console.log("***************");
		console.log(state);
		
		const res = await Order.update( state , { where: { id } });
		return res[0] > 0 ? true : false;
	}
	async Searchadmin(pageNum, pageSize, { state }) {
		const offset = (pageNum - 1) * pageSize;
		// 设置关联条件
		const whereOpt = {}
		console.log("111");
		state=7;
		state && Object.assign(whereOpt, { state })
		console.log(whereOpt);
		const { rows, count } = await Order.findAndCountAll({
			// 查表当中的哪些字段的
			attributes: ['id', 'goodsname', 'goodsusername', 'buyer', 'phone', 'address', 'price', 'pay'],
			where: whereOpt,
			offset: offset,
			limit: pageSize * 1
		});
		console.log("hhh");
		return {
			pageNum,
			pageSize,
			total: count,
			list: rows,
		};
	}
}

module.exports = new UserService();