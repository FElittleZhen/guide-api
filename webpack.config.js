const path =require("path"); 
var htmlwp = require('html-webpack-plugin');
module.exports={
    mode:"development",
    entry:'./src/main.js',  //指定打包的入口文件
    output:{
        path : __dirname+'/dist',  // 注意：__dirname表示webpack.config.js所在目录的绝对路径
        filename:'build.js'    //输出文件
    },
    devtool:'eval-source-map',//可以让浏览器看到源代码调试
    plugins:[
        new htmlwp({
           
            template: './app/index.js' //根据index1.html这个模板来生成(这个文件请程序员自己生成)
        })
    ]
}
