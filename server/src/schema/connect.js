const mongoose = require('mongoose')
const config = require('./../config/config')

// 获取链接
function getConnnect() {
  return new Promise((resolve, reject) => {
    mongoose.connect(config.dataBase.DB, {
      useNewUrlParser: true
    })
    let db = mongoose.connection
    isStart(db)
      .then(() => {
        resolve(mongoose)
      })
      .catch(() => {
        reject()
      })
  })
}

function isStart(db) {
  return new Promise((resolve, reject) => {
    db.once('open', () => {
      console.log('[mongodb] is start');
      resolve()
    })
    db.once('error', () => {
      console.log(`[mongodb] is error`)
      reject()
    })
  });
}

module.exports = getConnnect