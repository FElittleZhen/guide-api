// class类库  针对所有的user板块的 增删改查操作
const User = require('../model/user.model');
const md5 = require('md5');
class UserService{
	async createUser(username,password){
		// 写咱们增删改查的地方  增
		console.log("进入serve");
		const res = await User.create({username:username,password:md5(password)});
		// console.log(res);
		// 这是一个32位 不规则的字符串
		// e10adc3949ba59abbe56e057f20f883e
		return res.dataValues;
	}
	
	async getUserInfo({id,username,password,is_admin,token}){
		// 我定义一个空对象 作为我的where条件
		const whereOpt = {}
		console.log(username,password);
		id && Object.assign(whereOpt, {id})
		username && Object.assign(whereOpt, {username})
		password && Object.assign(whereOpt, {password})
		is_admin && Object.assign(whereOpt, {is_admin})
		token && Object.assign(whereOpt, {token})
		console.log("whereopt"+whereOpt);
		const res = await User.findOne({
					attributes: ['id', 'username', 'password', 'is_admin',"token","phone","wx","emial","school"],
					where: whereOpt,
				})
		// 查不到的情况下  咱们直接返回为空即可
		return res ? res.dataValues : null;
	}
	async getUsertoken({id,username,password,is_admin}){
		// 我定义一个空对象 作为我的where条件
		const whereOpt = {}
		id && Object.assign(whereOpt, {id})
		username && Object.assign(whereOpt, {username})
		password && Object.assign(whereOpt, {password})
		is_admin && Object.assign(whereOpt, {is_admin})
		const res = await User.findOne({
					attributes: ['id','token'],
					where: whereOpt,
				})
		// 查不到的情况下  咱们直接返回为空即可
		return res ? res.dataValues : null;
	}
	
	async DelteUsers(id){
		//destroy 删除操作 
		const res = await User.destroy({ where: { id } })
		return res > 0 ? true : false;
	}
	
	async UpdateUser(id,data){
		console.log("进入service");
		console.log(id,data.token);
		
		const token=data.token;
		console.log("token  "+token);
		const username=data.username
		const res = await User.update(data, { where: { username } });
		console.log("res "+res);
		return res[0] > 0 ? true : false;
	}
	async logoutUser(id,data){
		console.log("进入service");
		console.log(id,data.token);
		data.token="";
		const token=data.token;
		console.log("token  "+token);
		const username=data.name
		const res = await User.update(data, { where: { username } });
		console.log("res "+res);
		return res[0] > 0 ? true : false;
	}
	async Updateinfo(data,token){
		console.log("进入service");
		console.log(data,token);
		const id=data.id;
		const username="admin"
		const res = await User.update( data, { where:  {id}  });
		console.log("res "+res);
		return res[0] > 0 ? true : false;
	}
	
	
	async Listdata(pageNum,pageSize){
		// 数据库列表操作
		const offset = (pageNum - 1) * pageSize;
		const { count, rows } = await User.findAndCountAll({
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

module.exports = new UserService();