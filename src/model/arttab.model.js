/*
 * @Author: wangzhen12138 1615777455@qq.com
 * @Date: 2024-12-21 17:48:58
 * @LastEditors: wangzhen12138 1615777455@qq.com
 * @LastEditTime: 2024-12-22 18:18:47
 * @FilePath: \guide-api\src\model\article.model.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// sequelize 的数据类型
// 字符串  整数
const { DataTypes } = require('sequelize');
const seq = require('../db/seq');

// 第一个参数 是咱们数据表的名字  第二个是个对象  也就是咱们表当中每个字段的定义
const Article = seq.define('zd_arttabname', {
    artTabName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 0,
        comment: '文章分类',
        unique: true, // 设置唯一主键
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        // defaultValue:0,
        comment: '0默认下架,1是上架'
    },
});

// Article.sync({ force: true });
module.exports = Article;


