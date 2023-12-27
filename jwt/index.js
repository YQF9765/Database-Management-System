const jwt = require('jsonwebtoken')

Tooken = {
  //加密
  encryption(str) {
    let tookenVal = jwt.sign(str, 'tooken',{expiresIn: '1h'})
    return tookenVal
  },
  //解密
  decrypt(tookenVal) {
    try {
      let data = jwt.verify(tookenVal, 'tooken')
      return {
        msg: '解码成功',
        status: '200',
        data
      }
    }
    catch {
      return {
        msg: '解码失败',
        status: 301
      }
    }
  }
}

module.exports = Tooken