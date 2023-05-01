//1.获取元素
const header = document.querySelector('.header');
const back = document.querySelector('.scroll-top');

//2.监听顶部栏卷上的高度值
let scroll = window.onscroll = function(){
    console.log('scrolling');
    const height = document.documentElement.scrollTop || document.body.scrollTop;
    console.log(height);
    //3.到达指定高度时，顶部栏，回到顶部 显示
    if(height > 350){
        header.style.top = '0px';
        back.style.display = 'flex';
    }else{
        header.style.top = '-80px';
        back.style.display = 'none';
    }
};

//4. 回到顶部出现后，添加事件，返回顶部
back.onclick = function(){
    window.scrollTo({
        top:0,
        behavior:'smooth',
    })
}

