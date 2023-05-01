/*
简单版面向对象  --- 选项卡
1. 抽象内容
 + 一个能完成选项卡的对象，需要有哪些属性和方法
 + 属性： 所有可以点击的按钮盒子
 + 属性： 所有可以切换的选项盒子
 + 方法： 能添加点击事件的方法

2. 书写构造函数
 + 能创建一个对象，包含两个属性和一个方法
 + 属性直接卸载构造函数体内
 + 方法写在构造函数的原型上

*/

// 1. 书写构造函数
function Tabs(ele){
    //范围
    this.ele = document.querySelector(ele);
    //在范围内找到所有能点击盒子
    this.btns = this.ele.querySelectorAll('ul > li');
    //在范围内找到所有能切换的选项盒子
    this.tabs = this.ele.querySelectorAll('ol > li');
}

//原型上书写方法
Tabs.prototype.change = function(){
    //执行给所有btns 里面的 按钮添加点击事件
    //我怎么拿到 btns
    //绝对不能直接使用 t 这个变量
    console.log(this);

    //提前保存this(这里是实例，后面进入点击事件this变成当前事件处理函数的事件源-li-)
    let _this = this;

    for(let i = 0; i < this.btns.length; i++) {
        //提前保存索引
        this.btns[i].setAttribute('index',i);

        this.btns[i].addEventListener('click',function(){
            console.log('You have clicked');
            //需要让实例的 btns 里面的每一个都失去 active 类名
            //需要让实例的 tabs 里面的每一个都失去 active 类名
            //这里不是在 change 方法/函数的作用域里了， 而是在事件处理函数里的作用域
            //在事件处理函数里面， this 指向当前事件的事件源
            console.log(this);
            //当你访问 _this 的时候，其实是在访问变量
            //当自己的作用域没有， 就会去上一级作用域查找
            console.log(_this);
            for(let j=0; j <_this.btns.length; j++){
                _this.btns[j].className = '';
                _this.tabs[j].className = '';
            }

            //让当前点击的这个 li 有 active 类名
            this.className = 'active';
            //让当前点击的这个 li / 实例身上的tabs
            //拿到当前 li 身上保存的 索引
            let index = this.getAttribute('index') - 0;
            _this.tabs[index].className = 'active';
        })
    }
}

let t = new Tabs('#box');
//实例对象在调用方法
//函数调用方式，对象.方法名()
t.change();
//方法内部的this 就是指向 点 前面的 xxx
//我在change 方法里面写的 this 就是 t
console.log(t);



//box2
let t2 = new Tabs('#box2');
console.log(t2);
t2.change();

//box3
let t3 = new Tabs('#box3');
console.log(t3);
t3.change();