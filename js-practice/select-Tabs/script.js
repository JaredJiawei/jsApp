//1.获取元素
const btns = document.querySelectorAll('ul > li');
const tabs = document.querySelectorAll('ol > li');

//2.给 btns 里面所有按钮添加点击事件
console.log(btns);
for(let i = 0; i < btns.length; i ++){
    btns[i].onclick = function(){
        console.log(i);
        console.log(btns[i]);
        console.log(tabs[i]);
        //2.1 给btns 和 tabs 里面的所有内容取消 active 类名
        for(let j = 0; j < btns.length; j ++){
            btns[j].className = '';
            tabs[j].className = '';
        }
        //2.2 当前点击的按钮和索引对应的合资添加 active 类名
        btns[i].className = 'active';
        tabs[i].className = 'active';
    }
}