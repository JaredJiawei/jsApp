/*
案例 - 登录

分析需求：

问题1.什么时候进行发送Ajax请求？
    => 点击登录按钮的时候
    => 需要给 form 标签绑定一个表单提交事件

问题2.需要拿到什么信息？
    => form 提交后，需要拿到用户填写的用户名和密码

问题3.需要如何发送给后端？
    => 按照接口文档的规范进行发送
问题4.请求完成后，我们需要做什么？
    => 根据后端返回的信息，进行一些后续的操作
    => 如果后端返回的信息是登录成功，那么我们进行页面跳转
    => 如果后端返回的信息是登录失败，那么我们提示用户错误

 */

//0 获取元素
//0-1 获取form元素
let loginForm = document.querySelector('form');
console.log(loginForm);
//0-2 获取用户名文本框
let nameInp = document.querySelector('.username');
console.log(nameInp);
//0-3 获取密码文本框
let pwdInp = document.querySelector('.passwords');
console.log(pwdInp);
//0-4 错误提示文本
let errBox = document.querySelector('.error')
console.log(errBox);


// 1.给Form 标签绑定一个表单提交事件
loginForm.onsubmit = function(e){
    //注意：阻止变淡的默认提交行为
    e.preventDefault();
    console.log('我要发送ajax请求');

    //2.拿到填写的用户名和密码
    let name = nameInp.value;
    console.log(name);

    let pwd = pwdInp.value;
    console.log(pwd);

    //2-1. 验证用户名和密码
    if(name == '' || pwd == '') 
        return alert('请完整输入用户名和密码');
    
    //3. 发送ajax 请求
    //3.1 创建请求ajax对象
    let xhr = new XMLHttpRequest();
    //3.2 请求方式
    xhr.open('POST','http://localhost:5500/users/login',true);
    //3.3 请求完成后的逻辑
    xhr.onload = function(){
        //因为后端返回的是json  格式数据 需要JSON.parse解析
        let res = JSON.parse(xhr.responseText);
        console.log('succeeded',res);

        // 进行条件判断
        if(res.code === 0) {
            //登录失败了
            errBox.style.display = 'block';
        } else {
            //登录成功了
            window.location.href = './home.html'
        }
    }
    //3.4.1 注意携带参数需要提前说明 - 请求头
    xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
    //3.4.2 因为post请求携带参数是在 - 请求体内
    xhr.send('username=' + name + '&password=' + pwd);
}