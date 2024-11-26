
const Cate = require('../model/cate.model');
class CateService{
	async createCate(data){

		const res = await Cate.create(data);
		console.log('添加成功');
		return res.dataValues;
	}
	
	async getCateInfo({id,catename}){
		const whereOpt = {}
		id && Object.assign(whereOpt, {id})
		catename && Object.assign(whereOpt, {catename})
		const res = await Cate.findOne({
					attributes: ['id', 'catename'],
					where: whereOpt,
				})

		return res ? res.dataValues : null;
	}
	
	async delcate(id){
		const res = await Cate.destroy({ where: { id } })
		return res > 0 ? true : false;
	}
	
	async udcatename(id,data){
		const res = await Cate.update(data, { where: { id } });
		return res[0] > 0 ? true : false;
	}
	
	async cllist(pageNum,pageSize){
		const offset = (pageNum - 1) * pageSize;
		const { count, rows } = await Cate.findAndCountAll({
		  offset: offset,
		  limit: pageSize * 1,
		})
		return {
		  pageNum,
		  pageSize,
		  total: count,
		  list: rows,
		}
	}
}

module.exports = new CateService();