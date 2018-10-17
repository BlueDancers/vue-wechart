const mongoose = require('mongoose')
const config = require('./../config/config')

// 获取链接
function getConnnect () {
  return new Promise((resolve, reject) => {
    mongoose.connect(config.dataBase.DB, { useNewUrlParser: true })
    let db = mongoose.connection
    
  })
}