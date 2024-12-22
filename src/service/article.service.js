/*
 * @Author: wangzhen12138 1615777455@qq.com
 * @Date: 2024-12-21 17:58:39
 * @LastEditors: wangzhen12138 1615777455@qq.com
 * @LastEditTime: 2024-12-22 16:51:53
 * @FilePath: \guide-api\src\service\article.service.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const Article = require('../model/article.model');
class ArticleService{
	async createArticle(data){
		console.log("添加之前")
		const res = await Article.create(data);
		console.log('添加成功');
		return res.dataValues;
	}
	
	async getArticleInfo({id,Articlename}){
		const whereOpt = {}
		id && Object.assign(whereOpt, {id})
		Articlename && Object.assign(whereOpt, {Articlename})
		const res = await Article.findOne({
					attributes: ['id', 'Articlename'],
					where: whereOpt,
				})

		return res ? res.dataValues : null;
	}
	
	async delArticle(id){
		const res = await Article.destroy({ where: { id } })
		return res > 0 ? true : false;
	}
	
	async udArticlename(id,data){
		const res = await Article.update(data, { where: { id } });
		return res[0] > 0 ? true : false;
	}
	
	async cllist(pageNum,pageSize){
		const offset = (pageNum - 1) * pageSize;
		const { count, rows } = await Article.findAndCountAll({
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

module.exports = new ArticleService();