/*
    第一次尝试ajax 最基础的GET 请求
    第二次尝试ajax GET 请求后端返回json格式字符串
        + 需要解析步骤
        + 语法：let res = JSON.parse(xhr.responseText)
        +       console.log(res)
    第三次尝试ajax GET 带有参数的请求  
        + 根据接口文档填写参数
        + 填写位置 在ajax 配置请求信息中
            xhr.open('GET','xxx?arg=1&arg2=2',true)
    第四次尝试ajax POST 带有参数的请求
        + 根据接口文档填写参数
        + 1.需要请求体（要用的参数）
            写在 xhr.send 后面的（）
        + 2. 注意： 当发送POST 请求，并且需要携带参数的时候，需要特殊说明
            语法：xhr.setResquestHeader('centent-type',你传递参数的格式)
*/

//1. 创建一个Ajax object
let xhr = new XMLHttpRequest()

//2. 配置本次的请求信息
// 请求方式： 按照 接口文档 来进行书写
// 请求方式：按照接口文档来进行书写
// 请求地址：按照接口文档来进行书写
// 是否异步：默认是 true 表示异步请求， 选填为false,表示同步请求
// xhr.open(请求方式,请求地址,是否异步)
xhr.open('GET','http://localhost:5500/test/first',true)

//3. 配置一个请求完成后触发的事件
//请求完成： 本次请求发送出去，服务器接收到了我们的请求，并且服务器返回信息已经回到了浏览器
xhr.onload =  function(){
    // 如何拿到后端返回的信息
    // 语法：xhr.responseText
    console.log(xhr.responseText);
    console.log('请求完成');
//3.1 第二次（更为常见的操作）后端通常不会只返回一个字符串类型数据，通常会返回json格式字符串
// json 需要解析步骤
//语法：JSON.parse(json格式字符串)
//返回值：解析好的 js 格式的数据
let res = JSON.parse(xhr.responseText);
console.log(res);
}

//4. 把本次请求发送出去
xhr.send();

//第三次Ajax Get 请求，并带有参数
let xhr3 = new XMLHttpRequest();
xhr3.open('GET','http://localhost:5500/test/third?name=jared&age=18',true)
xhr3.onload = function(){
    console.log(JSON.parse(xhr3.responseText))
}
xhr3.send()

//第四次Ajax POST 请求，并带有参数
let xhr4 = new XMLHttpRequest();
xhr4.open('post','http://localhost:5500/test/fourth',true)
xhr4.onload = function(){
    console.log(JSON.parse(xhr4.responseText))
}
//请求头 request head
xhr4.setRequestHeader('content-type','application/x-www-form-urlencoded')
//请求体
xhr4.send('name=Jared&age=18')