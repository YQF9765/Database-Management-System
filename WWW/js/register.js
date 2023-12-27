$('.but').click(() => {
  let uname = $('.uname').val()
  let pwd = $('.pwd').val()
  let pwd1 = $('.pwd1').val()
  if (pwd === pwd1) {
    $.ajax({
      type: 'POST',
      url: 'http://localhost:3001/register',
      data: `username=${uname}&password=${pwd1}`,
      success: (res) => {
        console.log(res);
        if (res.status == 4501) {
          alert('用户名格式错误')
        } else if (res.status == 4502) {
          alert('密码格式错误')
        } else if (res.status == 4500) {
          alert('账号已存在')
        } else {
          alert('注册成功')
          window.location.replace('log_on.html')
        }
      }
    })
  } else {
    alert('两次密码不一致')
  }
  let uname_val = $('.uname').val('')
  let pwd_val = $('.pwd').val('')
  let pwd1_val = $('.pwd1').val('')
})

