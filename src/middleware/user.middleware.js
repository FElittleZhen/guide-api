const {getUserInfo} = require('../service/user.service');
const userValidator = async (ctx, next) => {
	const {username,password} = ctx.request.body;
	if (!username || !password) {
		ctx.status = 400;
		ctx.body = {
			code: 10001,
			message: '用户名或者密码为空',
			result: '',
		}
		return;
	}
	await next();
}
//检测用户是否存在与数据库当中
const verifyUser = async (ctx, next) => {
	const {username} = ctx.request.body;
	const is_user = await getUserInfo({username});
	if(is_user){
		ctx.body = {
			code: 10002,
			message: '用户已经存在，请更改用户名',
			result: '',
		}
		return;
	}
	await next();
}

module.exports = {
	userValidator,
	verifyUser 
}