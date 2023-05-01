//1. 获取元素element
const header = document.querySelector(".header");
const backTop = document.querySelector(".backtop");

//2.绑定事件， 滚动浏览器
const scrollHeight = window.onscroll = function(){
    const height = document.documentElement.scrollTop || document.body.scrollTop;
    console.log(height);
    
    //3.判断卷去高度
    if(height > 300){
        //显示，选择元素
        header.style.top = "0px";
        backTop.style.display = "flex";
    }else{
        header.style.top = "-80px";
        backTop.style.display = "none";
    }
};

//4.添加绑定事件
backTop.onclick = function(){
    //4.1
    window.scrollTo({
        top:0,
        behavior: "smooth",
    })
}