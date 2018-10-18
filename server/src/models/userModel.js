const user = require('../schema/userSchema')

function addUser(openid, userinfo) {
    console.log(openid, userinfo, '数据库获取数据');
    return user.then(user => {
        return new Promise((resolve, reject) => {
            user.findOne({
                openid
            }, (err, callback) => {
                if (err) {
                    reject('database is Error!')
                    return
                }
                if (!callback) {
                    user.create({
                        openid,
                        nickName: userinfo.nickName,
                        gender: userinfo.gender,
                        language: userinfo.language,
                        city: userinfo.city,
                        province: userinfo.province,
                        country: userinfo.country,
                        avatarUrl: userinfo.avatarUrl
                    }, (err) => {
                        if (err) {
                            reject('database is insert Error!')
                            return
                        }
                        resolve('注册完成')
                    })
                } else {
                    console.log('用户已经存在');
                }
            })
        })
    })

}


module.exports = {
    addUser
}