// 修改密码的逻辑
//1. 验证登录
const token = window.localStorage.getItem('token')
const id = window.localStorage.getItem('id')


if(!token || !id) {
    window.location.href = '/user/login.html'
} else {
    getInfo()
}
//2. 获取用户信息
function getInfo(){
    // 直接发送请求， 请求个人信息
    $.ajax({
        url:'http://localhost:5500/users/info',
        method:'get',
        data:{id:id},
        headers: {authorization: token},
        success (res){
            console.log(res)
            // 判断错误
            if(res.code !== 1) {
                window.location.href = '/user/login.html'
            }
        }
    })
}

//3. 表单提交发送请求， 修改密码
$('form').on('submit', function(e){
    //3-1. 阻止默认行为
    e.preventDefault()
    
    //3-2. 采集用户信息
    const data = $('form').serialize()
    console.log(data)

    //3-3. 发送请求
    $.ajax({
        url:'http://localhost:5500/users/rpwd',
        data: data + '&id=' + id,
        method:'post',
        headers: { authorization: token},
        success(res){
            console.log(res)
            //3-4 根据结果进行错误提示
            if(res.code !== 1) {
                $('form > span').css('display', 'block')
                return
            }
            //3-5 提示用户修改密码成功
            window.alert('修改密码成功，点击确认跳转回登录页面')
            window.location.href = '/user/login.html'
        }

    })
})