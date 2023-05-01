// 登录页面的逻辑代码
$('form').on('submit', function(e){
    //1. 阻止默认时间
    e.preventDefault()

    //2. 采集用户信息
    const data = $('form').serialize()

    console.log(data)

    //3. 发送请求
    $.post('http://localhost:5500/users/login', data, (res) => {
        console.log(res)

        //4. 判断登录失败
        if(res.code === 0) {
            //提示错误
            $('form > span').css('display', 'block')
            return
        }

        //5. 登录成功
        //直接跳转到首页
        //window.location.href = '/user/index.html'

        //5-1. 把登录过的“凭证” 存储起来，为了其他页面使用
        window.localStorage.setItem('token', res.token)
        //5-2. 把用户的ID 信息也存储起来
        window.localStorage.setItem('id', res.user.id)
        //5-3. 跳转页面
        window.location.href = '/user/index.html'
        return false

    })
})