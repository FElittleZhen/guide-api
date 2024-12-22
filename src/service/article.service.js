/*
 * @Author: wangzhen12138 1615777455@qq.com
 * @Date: 2024-12-21 17:58:39
 * @LastEditors: wangzhen12138 1615777455@qq.com
 * @LastEditTime: 2024-12-22 19:00:46
 * @FilePath: \guide-api\src\service\article.service.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const Article = require('../model/article.model');
class ArticleService {
	async createArticle(data) {
		data.status = 1;
		const res = await Article.create(data);
		return res.dataValues;
	}
	async getabtitle({ artTabName }) {
		const whereOpt = {}
		artTabName && Object.assign(whereOpt, { artTabName })
		const res = await Article.findAndCountAll({
			attributes: ['id', 'artTitle', 'artTabName','articleContent'],
			where: whereOpt,
		})
		return res ? res : "";
	}


}

module.exports = new ArticleService();