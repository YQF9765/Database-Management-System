
$('.but').click(() => {
  let uname = $('.uname').val()
  let pwd = $('.pwd').val()
  console.log(uname, pwd);

  $.ajax({
    type: 'POST',
    url: 'http://localhost:3001/log_on',
    headers: {
      'Content-Type': 'application/json'
    },
    // data: `username=${uname}&password=${pwd}`,
    data: JSON.stringify({ username: uname, password: pwd }),
    success: (res) => {
      console.log(res);
      if (res.status == 4501) {
        alert('用户名格式错误')
      } else if (res.status == 4502) {
        alert('密码格式错误')
      } else if (res.status == 4569) {
        alert('用户不存在，请先注册')
      } else if (res.status == 4570) {
        alert('密码或用户名错误')
      } else {
        const token = res.token
        localStorage.setItem('TOKEN', token)

        alert('登录成功')
        window.location.replace('index.html')

      }
    }
  })

  let uname_val = $('.uname').val('')
  let pwd_val = $('.pwd').val('')
  let pwd1_val = $('.pwd1').val('')


})

