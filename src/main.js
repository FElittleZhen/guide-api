const {APP_PORT} = require('./config/config.default');
//为啥我的路径 ./app/index.js
const app = require('./app');

app.listen(APP_PORT,()=>{
	console.log(`serve is running on http://localhost:${APP_PORT}`)
})
