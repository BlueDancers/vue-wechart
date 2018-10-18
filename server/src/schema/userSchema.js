const getConnent = require('./connect')
const config = require('../config/config')

module.exports = getConnent(config.dataBase.DB)
    .then(mongo => {
        let Schema = mongo.Schema
        let List = new Schema({
            openid: {
                type: String
            },
            nickName: {
                type: String
            },
            gender: {
                type: Number
            },
            language: {
                type: String
            },
            city: {
                type: String
            },
            province: {
                type: String
            },
            country: {
                type: String
            },
            avatarUrl: {
                type: String
            }
        })
        let list = mongo.model('users',List)
        return list
    })
    .catch(() => {
        console.log('连接数据库表失败');
        
    })