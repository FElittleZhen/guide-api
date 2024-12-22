/*
 * @Author: wangzhen12138 1615777455@qq.com
 * @Date: 2024-12-21 17:58:39
 * @LastEditors: wangzhen12138 1615777455@qq.com
 * @LastEditTime: 2024-12-22 18:16:54
 * @FilePath: \guide-api\src\service\ArtTab.service.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const ArtTab = require('../model/arttab.model');
class ArtTabService {
	async gettablist(pageNum,pageSize){
		// const offset = (pageNum - 1) * pageSize;
		console.log("1")
		const { count, rows } = await ArtTab.findAndCountAll({
		//   offset: offset,
		//   limit: pageSize * 1,
		})
		return {
		  pageNum,
		  pageSize,
		  total: count,
		  list: rows,
		}
	}
	async createArtTab(data) {
		console.log("添加之前")
		data.status = 1;
		console.log(data)
		const res = await ArtTab.create(data);
		console.log('添加成功');
		return res.dataValues;
	}
}

module.exports = new ArtTabService();