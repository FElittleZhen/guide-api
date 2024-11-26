// class类库  针对所有的user板块的 增删改查操作
const review = require('../model/review.model');
const md5 = require('md5');
class ReviewService{
	async createreview({artid,reviewid,reviewname,reviewcontent}){
		// 写咱们增删改查的地方  增
		console.log("进入服务层");
		console.log({artid,reviewid,reviewname,reviewcontent});
		
		const res = await review.create({artid,reviewid,reviewname,reviewcontent});
		// console.log(res);
		// 这是一个32位 不规则的字符串
		// e10adc3949ba59abbe56e057f20f883e
		return res.dataValues;
	}
	async createRereview({reviewid,reviewname,reviewcontent}){
		// 写咱们增删改查的地方  增
		console.log("进入服务层");
      console.log({reviewid,reviewname,reviewcontent});
		
		const res = await review.create({reviewname,reviewcontent,reviewid});
		// console.log(res);
		// 这是一个32位 不规则的字符串
		// e10adc3949ba59abbe56e057f20f883e
		return res.dataValues;
	}
	async SearchReview(pageNum,pageSize,{artid,reviewname,reviewcontent}){
		const offset = (pageNum - 1) * pageSize;
		// 设置关联条件
		console.log(artid);
		const whereOpt = {}
		artid && Object.assign(whereOpt, {artid})
		reviewname && Object.assign(whereOpt, {reviewname})
		reviewcontent && Object.assign(whereOpt, {reviewcontent})
		console.log(whereOpt);
		const { rows, count } = await review.findAndCountAll({
		  // 查表当中的哪些字段的
		  attributes: ['id','artid','reviewname','reviewcontent'],
		 where: whereOpt,
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
	async SearchReviewId(reviewid){
		const whereOPt={};
		reviewid && Object.assign(whereOPt,{reviewid})
		const {rows, count} =await review.findAndCountAll({
			attributes:['id','reviewname','reviewcontent','reviewid'],
			where:whereOPt,
		});
		return rows;
			
		
	}
}

module.exports = new ReviewService();