let host = 'localhost'
let port = 27017
let dataBaseName = 'VueWechart'

module.exports = {
    appid: 'wx7716604375333b3b',
    secret: '0bc6dabe79eca5fbbe15d6576781c537',
    dataBase: {
        DB: `mongodb://${host}:${port}/${dataBaseName}` // 数据库地址
    },
    secretOrPublicKey: 'private'
}