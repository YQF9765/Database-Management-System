// 加载页面渲染部分
console.log(localStorage.getItem('TOKEN'));
let id = 0
$(() => {
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3001/loading',
    success: (res) => {
      if (res.status == 5001) {
        alert('输入格式有误')
      } else {
        for (let i = 0; i < res.length; i++) {
          id++
          let date = res[0].register_date
          let reg_date = new Date(date)
          let year = reg_date.getFullYear()
          let month = reg_date.getMonth() + 1
          let day = reg_date.getDate()
          let hours = reg_date.getHours()
          let minutes = reg_date.getMinutes()
          let seconds = reg_date.getSeconds()
          month = month < 10 ? '0' + month : month
          day = day < 10 ? '0' + day : day
          hours = hours < 10 ? '0' + hours : hours
          minutes = minutes < 10 ? '0' + minutes : minutes
          seconds = seconds < 10 ? '0' + seconds : seconds
          let tr = $('<tr></tr>')
          $('tbody').append(tr)
          let td1 = $(`<td><input type="checkbox" class="checkbox"></td>`)
          let td2 = $(`<td>${id}</td>`)
          let td3 = $(`<td>${res[i].username}</td>`)
          let td4 = $(`<td>${res[i].sex}</td>`)
          let td5 = $(`<td>${res[i].department}</td>`)
          let td6 = $(`<td>${res[i].phone_num}</td>`).addClass('phone_num')
          let td7 = $(`<td>${res[i].native_place}</td>`)
          let td8 = $(`<td>${year}-${month}-${day} ${hours}:${minutes}:${seconds}</td>`)
          let td9 = $(`<td></td>`)
          let operate_a1 = $('<a href="javascript:;">编辑</a>').addClass('operate_but operate_edit')
          let operate_a1_i1 = $('<i></i>').addClass('operate_edit_i iconfont icon-edit-1-copy')
          operate_a1.prepend(operate_a1_i1)
          let operate_a2 = $('<a href="javascript:;">删除</a>').addClass('operate_but operate_del')
          let operate_a1_i2 = $('<i></i>').addClass('operate_del_i iconfont icon-closel')
          operate_a2.prepend(operate_a1_i2)
          td9.append(operate_a1, operate_a2)
          tr.append(td1, td2, td3, td4, td5, td6, td7, td8, td9)
        }

      }
    }
  })
})

// 新增部分
// 新增按钮
$('.increase').click(() => {
  $('.addWindow_dis').css("display", "block")
})
//新增提交按钮
$('#add_submitTo').click(() => {
  id++
  let username = $('#name').val()
  let sex = ''
  if ($('#male')[0].checked) {
    sex += '男'
  } else {
    sex += '女'
  }
  let department = $('#department').val()
  let phone = $('#phone').val()
  let native_place = $('#native_place').val()

  $.ajax({
    type: 'POST',
    url: 'http://localhost:3001/increase',
    data: `name=${username}&sex=${sex}&department=${department}&phone=${phone}&native_place=${native_place}`,
    success: (res) => {
      if (res.status == 5001) {
        alert('输入格式有误')
      } else {
        alert('新增用户成功')
      }
    }
  })

  $.ajax({
    type: 'POST',
    url: 'http://localhost:3001/query',
    data: `name=${username}&sex=${sex}&department=${department}&phone=${phone}&native_place=${native_place}`,
    success: (res) => {
      let date = res[0].register_date
      let reg_date = new Date(date)
      let year = reg_date.getFullYear()
      let month = reg_date.getMonth() + 1
      let day = reg_date.getDate()
      let hours = reg_date.getHours()
      let minutes = reg_date.getMinutes()
      let seconds = reg_date.getSeconds()
      month = month < 10 ? '0' + month : month
      day = day < 10 ? '0' + day : day
      hours = hours < 10 ? '0' + hours : hours
      minutes = minutes < 10 ? '0' + minutes : minutes
      seconds = seconds < 10 ? '0' + seconds : seconds
      let tr = $('<tr></tr>')
      $('tbody').append(tr)
      let td1 = $(`<td><input type="checkbox" class="checkbox"></td>`)
      let td2 = $(`<td>${id}</td>`)
      let td3 = $(`<td>${username}</td>`)
      let td4 = $(`<td>${sex}</td>`)
      let td5 = $(`<td>${department}</td>`)
      let td6 = $(`<td>${phone}</td>`).addClass('phone_num')
      let td7 = $(`<td>${native_place}</td>`)
      let td8 = $(`<td>${year}-${month}-${day} ${hours}:${minutes}:${seconds}</td>`)
      let td9 = $(`<td></td>`)
      let operate_a1 = $('<a href="javascript:;">编辑</a>').addClass('operate_but operate_edit')
      let operate_a1_i1 = $('<i></i>').addClass('operate_edit_i iconfont icon-edit-1-copy')
      operate_a1.prepend(operate_a1_i1)
      let operate_a2 = $('<a href="javascript:;">删除</a>').addClass('operate_but operate_del')
      let operate_a1_i2 = $('<i></i>').addClass('operate_del_i iconfont icon-closel')
      operate_a2.prepend(operate_a1_i2)
      td9.append(operate_a1, operate_a2)
      tr.append(td1, td2, td3, td4, td5, td6, td7, td8, td9)
    }
  })

  // //提交完毕，清空文本框内容
  $('#name').val('')
  $('#male')[0].checked = true
  $('#department').val('')
  $('#phone').val('')
  $('#native_place').val('')
  $('.addWindow_dis').css("display", "none")
})
// 新增-关闭按钮
$('.addWindow_close').click(() => {
  $('.addWindow_dis').css("display", "none")
})


//tr删除按钮
$(document).on('click', '.operate_del', (e) => {
  let target = e.target
  let phone_num = $(target).parent().parent().children().eq(5).text()
  $(target).parent().parent().remove()
  $.ajax({
    type: 'DELETE',
    url: 'http://localhost:3001/delete',
    data: `phone_num=${phone_num}`,
    success: (res) => {
      alert('删除成功')
    }
  })
})


// 修改
$(".modify").click(() => {
  let checkboxs = $('.checkbox')
  console.log(checkboxs);
  for (let i = 0; i < checkboxs.length; i++) {
    if (checkboxs[i].checked == true) {
      $(".modify_back").css("display", "block")
      let modify_val = checkboxs.eq(i).parent().parent().children()
      console.log(modify_val);
      $('#modify_name').val(modify_val.eq(2).text())
      let set = modify_val.eq(3).text()
      if (set == '男') {
        $('#modify_male').prop("checked", true)
      } else {
        $('#modify_female').prop("checked", true)
      }
      $('#modify_department').val(modify_val.eq(4).text())
      $('#modify_phone').val(modify_val.eq(5).text())
      $('#modify_native_place').val(modify_val.eq(6).text())

      // 修改提交按钮
      $('#modify_submitTo').click(() => {
        let modify_username = $('#modify_name').val()
        let modify_sex = ''
        if ($('#modify_male')[0].checked) {
          modify_sex += '男'
        } else {
          modify_sex += '女'
        }
        let modify_department = $('#modify_department').val()
        let modify_phone = $('#modify_phone').val()
        let modify_native_place = $('#modify_native_place').val()
        console.log(modify_username, modify_sex, modify_department, modify_phone, modify_native_place);

        $.ajax({
          type: 'PUT',
          url: 'http://localhost:3001/modify',
          data: `name=${modify_username}&sex=${modify_sex}&department=${modify_department}&phone=${modify_phone}&native_place=${modify_native_place}`,
          success: (res) => {
            console.log(res);
          }
        })

        modify_val.eq(2).text(modify_username)
        modify_val.eq(3).text(modify_sex)
        modify_val.eq(4).text(modify_department)
        modify_val.eq(5).text(modify_phone)
        modify_val.eq(6).text(modify_native_place)
        //提交完毕，清空文本框内容
        $('#modify_name').val('')
        $('#modify_department').val('')
        $('#modify_phone').val('')
        $('#modify_native_place').val('')
        $('.modify_back').css("display", "none")
        $('#modify_submitTo').off('click')
        checkboxs[i].checked = false
      })

    }

  }
})


//tr编辑按钮
$(document).on('click', '.operate_edit', (e) => {
  $('.modify_back').css("display", "block")
  let oper_edit = $(e.target)
  let values = oper_edit.parent().parent().children()
  $('#modify_name').val(values.eq(2).text())
  let set = values.eq(3).text()
  if (set == '男') {
    $('#modify_male').prop("checked", true)
  } else {
    $('#modify_female').prop("checked", true)
  }
  $('#modify_department').val(values.eq(4).text())
  $('#modify_phone').val(values.eq(5).text())
  $('#modify_native_place').val(values.eq(6).text())


  //修改提交按钮
  $('#modify_submitTo').click(() => {
    let modify_username = $('#modify_name').val()
    let modify_sex = ''
    if ($('#modify_male')[0].checked) {
      modify_sex += '男'
    } else {
      modify_sex += '女'
    }
    let modify_department = $('#modify_department').val()
    let modify_phone = $('#modify_phone').val()
    let modify_native_place = $('#modify_native_place').val()
    console.log(modify_username, modify_sex, modify_department, modify_phone, modify_native_place);

    $.ajax({
      type: 'PUT',
      url: 'http://localhost:3001/modify',
      data: `name=${modify_username}&sex=${modify_sex}&department=${modify_department}&phone=${modify_phone}&native_place=${modify_native_place}`,
      success: (res) => {
        console.log(res);
      }
    })

    $.ajax({
      type: 'POST',
      url: 'http://localhost:3001/query',
      data: `name=${modify_username}&sex=${modify_sex}&department=${modify_department}&phone=${modify_phone}&native_place=${modify_native_place}`,
      success: (res) => {
        console.log(res);
        // let modify_val = oper_edit.parent().parent().children()
        // // console.log(modify_val);
        // // console.log(res[0].username);
        // console.log(modify_val.eq(2));
        // modify_val.eq(2).text(res[0].username)
        // modify_val.eq(3).text(res[0].sex)
        // modify_val.eq(4).text(res[0].department)
        // modify_val.eq(5).text(res[0].phone_num)
        // modify_val.eq(6).text(res[0].native_place)
      }
    })
    let modify_val = oper_edit.parent().parent().children()
    console.log(modify_val);
    modify_val.eq(2).text(modify_username)
    modify_val.eq(3).text(modify_sex)
    modify_val.eq(4).text(modify_department)
    modify_val.eq(5).text(modify_phone)
    modify_val.eq(6).text(modify_native_place)
    //   //提交完毕，清空文本框内容
    $('#modify_name').val('')
    $('#modify_department').val('')
    $('#modify_phone').val('')
    $('#modify_native_place').val('')
    $('.modify_back').css("display", "none")
    $('#modify_submitTo').off('click')
  })


})


// 修改-关闭按钮
$('.modify_close').click(() => {
  $('.modify_back').css("display", "none")
})


// 复选框
let checkboxAll = $("#checkbox")
checkboxAll.click(() => {
  let checkboxs = $('.checkbox')
  if (checkboxAll[0].checked === true) {
    $('.delete').css("backgroundColor", "#ed5565")  //深色
    for (let i = 0; i < checkboxs.length; i++) {
      checkboxs[i].checked = true
    }
  } else {
    $('.delete').css("backgroundColor", "#f59ca6")  //浅色
    for (let i = 0; i < checkboxs.length; i++) {
      checkboxs[i].checked = false
    }
  }
})
$(document).on('click', '.checkbox', (e) => {
  let inp_che = e.target
  if (inp_che.checked == true) {
    $('.delete').css("backgroundColor", "#ed5565") //深色
    $('.modify').css("backgroundColor", "#1ab394")
  } else {
    $('.delete').css("backgroundColor", "#f59ca6") //浅色
    $('.modify').css("backgroundColor", "#6cd9c3")
  }

  let checkboxs = $('.checkbox')
  for (let i = 0; i < checkboxs.length; i++) {
    if (checkboxs[i].checked === false) {
      checkboxAll[0].checked = false
      return
    }
    checkboxAll[0].checked = true
    $('.delete').css("backgroundColor", "#ed5565") //深色
  }
})


// 总删除按钮
$(".delete").click(() => {
  let checkboxs = $('.checkbox')
  for (let i = 0; i < checkboxs.length; i++) {
    if (checkboxs[i].checked == true) {
      let value = $(checkboxs[i]).parent().parent().children()
      let phone_num = value.eq(5).text()
      $.ajax({
        type: 'DELETE',
        url: 'http://localhost:3001/delete',
        data: `phone_num=${phone_num}`,
        success: (res) => {
          alert('删除成功')
        }
      })
      checkboxs.eq(i).parent().parent().remove()
    }
  }
})

