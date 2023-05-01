// 首页的逻辑代码
// 问题： 如何在首页知道我登录成功了？
// 通过登录成功以后存储的凭证来证明
// 1. 拿到 localStorage 内的凭证
const token = window.localStorage.getItem('token')
const id = window.localStorage.getItem('id')

// 2. 判断 token 和 id 是否存在
if(!token || !id){
    // 表示你还没有登录过
    // 不需要展示登录后的内容
    $('.off').addClass('active')
    $('.on').removeClass('actice')
} else {
    //表示登陆过
    // 我们应该请求用户信息， 吧用户昵称展示出来
    getInfo()
}

// 3. 请求用户信息
function getInfo(){
    //3-1. 发送请求，请求用户信息
    $.ajax({
        url:'http://localhost:5500/users/info',
        method:'GET',
        data:{id: id},
        headers:{
            authorization: token
        },
        success (res){
            console.log(res)
            //3-2. 判断是否登录
            if(res.code !== 1) {
                $('.off').addClass('active')
                $('.on').removeClass('actice')
                return
            } else {
                $('.on').addClass('active').find('span').text(res.info.nickname)
                $('.off').removeClass('active')
            }
        }
    })
}

// 4. 个人中心的跳转
$('button.self').on('click', function(){
    window.location.href = './self.html'
})

// 5. 退出登录
$('button.logout').on('click', function(){
    //直接发送请求，请求退出
    $.get('http://localhost:5500/users/logout', {id:id}, res => {
        // 退出登录页面以后, 直接刷新页面
        window.location.reload()
    })
})