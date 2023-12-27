const express = require("express")
const router = express.Router()
const md5 = require("md5");
const jwt = require("../jwt/index")
const database = require("../db/index")


//注册
router.post('/register', (req, res) => {
  //1、解析参数
  let { username, password } = req.body;
  //2、正则验证
  let reg_u = /[\u4e00-\u9fa5]$/;
  let regUsername = reg_u.test(username)  //true|false

  let reg_p = /^[a-zA-Z0-9_-]{6,16}$/;
  let regPassword = reg_p.test(password); //true|false

  if (regUsername == true && regPassword == true) {
    //3、密码加密后入库
    password = md5(password);

    database.getConnection((error, connection) => {
      if (error) {
        res.status(503).json({
          msg: "服务器炸了",
          status: 4567
        })
      } else {
        connection.query(`insert into user(username,password) values("${username}","${password}")`, (error, result) => {
          database.releaseConnection(connection) /*释放*/
          if (error) {
            if (error.errno == 1062) {
              res.status(200).json({
                msg: "账号已存在",
                status: 4500
              })
            } else {
              res.status(503).json({
                msg: "数据库炸了",
                status: 4568
              })
            }
          } else {
            res.json({
              status: 4568,
              msg: "注册成功"
            })
          }
        })
      }
    })
  } else {
    if (regUsername == false) {
      res.status(200).json({
        msg: "用户名格式错误",
        status: 4501
      })
    } else {
      res.status(200).json({
        msg: "密码格式错误",
        status: 4502
      })
    }
  }
})


//登录
router.post('/log_on', (req, res) => {
  //1、解析参数
  let { username, password ,headers} = req.body;

  //2、正则验证
  let reg_u = /[\u4e00-\u9fa5]$/;
  let regUsername = reg_u.test(username)  //true|false

  let reg_p = /^[a-zA-Z0-9_-]{6,16}$/;
  let regPassword = reg_p.test(password); //true|false

  if (regUsername == true && regPassword == true) {
    // //3、密码加密后对比
    password = md5(password);

    database.getConnection((error, connection) => {
      if (error) {
        res.status(503).json({
          msg: "服务器炸了",
          status: 4567
        })
      } else {
        connection.query(`select * from user where username="${username}"`, (error, result) => {
          database.releaseConnection(connection) /*释放*/
          if (error) {
            res.status(503).json({
              msg: "数据库炸了",
              status: 4568
            })
          } else {
            if (result.length == 0) {
              res.status(200).json({
                msg: "用户不存在，请先注册",
                status: 4569
              })
            } else {
              connection.query(`select * from user where username="${username}" and password="${password}"`, (error, result) => {
                database.releaseConnection(connection) /*释放*/
                if (error) {
                  res.status(503).json({
                    msg: "数据库炸了",
                    status: 4568
                  })
                } else {
                  if (result.length == 0) {
                    res.status(200).json({
                      msg: "密码错误",
                      status: 4570
                    })
                  } else {
                    let token = jwt.encryption({ username, password })
                    console.log(token);
                    res.json({
                      status: 4590,
                      msg: "登录成功",
                      token: 'Bearer ' + token
                    })
                  }
                }
              })
            }
          }
        })
      }
    })
  } else {
    if (regUsername == false) {
      res.status(200).json({
        msg: "用户名格式错误",
        status: 4501
      })
    } else {
      res.status(200).json({
        msg: "密码格式错误",
        status: 4502
      })
    }
  }
})

router.get('/', (req, res) => {
  res.redirect('/log_on.html')
})
// router.get('/index.html', (req, res) => {
//   res.redirect('/log_on.html')
// })


// 增
router.post('/increase', (req, res) => {
  // 1、解析参数
  let { name, sex, department, phone, native_place } = req.body
  //2、正则验证
  let reg_u = /[\u4e00-\u9fa5]$/;
  let characters = reg_u.test(name, department, native_place)
  let reg_h = /^1[3456789]\d{9}$/
  let number = reg_h.test(phone)
  if (characters == true && number == true) {
    database.getConnection((error, connection) => {
      if (error) {
        console.log(error);
        res.status(503).json({
          msg: '服务器炸了',
          status: 5000
        })
        console.log(error);
      } else {
        connection.query(`insert into information_table(username,sex, department, phone_num, native_place) values("${name}","${sex}","${department}","${phone}","${native_place}")`, (error, result) => {
          database.releaseConnection(connection) /*释放*/
          if (error) {
            console.log(error);
          } else {
            res.json({
              status: 4568,
              msg: "新增用户成功"
            })
          }
        })
      }
    })
  } else {
    res.status(200).json({
      msg: "输入格式错误",
      status: 5001
    })
  }

})
// 删
router.delete('/delete', (req, res) => {
  let { phone_num } = req.body
  // console.log(phone_num);
  database.getConnection((error, connection) => {
    if (error) {
      console.log(error);
      res.status(503).json({
        msg: '服务器炸了',
        status: 5000
      })
    } else {
      database.query(`delete from information_table where phone_num="${phone_num}"`, (error, result) => {
        database.releaseConnection(connection) /*释放*/
        if (error) {
          res.status(503).json({
            msg: '服务器炸了',
            status: 5000
          })
        } else {
          res.json({
            status: 5028,
            msg: "删除用户成功"
          })
        }
      })
    }
  })
})
//改
router.put('/modify', (req, res) => {
  let { name, sex, department, phone, native_place } = req.body
  database.getConnection((error, connection) => {
    if (error) {
      // console.log(1);
      console.log(error);
      res.status(503).json({
        msg: '服务器炸了',
        status: 5000
      })
      console.log(error);
    } else {
      connection.query(`update information_table set username="${name}",sex="${sex}",department="${department}",phone_num="${phone}",native_place="${native_place}" where phone_num="${phone}"`, (error, result) => {
        database.releaseConnection(connection) /*释放*/
        if (error) {
          console.log(error);
        } else {
          res.json(result)
        }
      })
    }
  })
})
//查
router.post('/query', (req, res) => {
  let { name, sex, department, phone, native_place } = req.body
  // console.log(name, sex, department, phone, native_place);
  database.getConnection((error, connection) => {
    if (error) {
      console.log(error);
      res.status(503).json({
        msg: '服务器炸了',
        status: 5000
      })
      console.log(error);
    } else {
      // connection.query(`select register_date from information_table where phone_num="${phone}"`, (error, result) => {
      connection.query(`select * from information_table where phone_num="${phone}"`, (error, result) => {
        database.releaseConnection(connection) /*释放*/
        if (error) {
          console.log(error);
        } else {
          // console.log(result);
          res.json(result)
        }
      })
    }
  })
})
// 加载渲染
router.post('/loading', (req, res) => {
  database.getConnection((error, connection) => {
    if (error) {
      res.status(503).json({
        msg: '服务器炸了',
        status: 5000
      })
    } else {
      connection.query('select * from information_table', (error, result) => {
        database.releaseConnection(connection) /*释放*/
        if (error) {
          console.log(error);
        } else {
          res.json(result)
          // console.log(result);
        }
      })
    }
  })
})



module.exports = router;