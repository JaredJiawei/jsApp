//绑定事件
//1. 获取需要用到的元素
var outer = document.querySelector('.outer');
var center = document.querySelector('.center');
var inner = document.querySelector('.inner');
//2. 给3个元素绑定点击事件
outer.onclick = function(){ console.log('我是outer元素,我被点击')};
center.onclick = function(){ console.log('我是center元素,我被点击')};
inner.onclick = function(e){ 
    console.log('我是inner元素,我被点击')
    e.stopPropagation();
};
// 事件传播过程  1，捕获阶段  2，目标阶段 3，冒泡阶段
// 事件的传播机制，默认是在冒泡阶段  触发事件
// 语法： 事件对象.stopPropagation)();


//事件委托 点击li触发事件（让ul元素 帮 li元素，使无需逐一绑定li，即绑定ul就可） 
var ul = document.querySelector('ul');
//给 ul 绑定一个事件, 事件对象的参数是e
ul.onclick = function(e){
    console.log(e.target);
    if(e.target.tagName === 'LI'){
        console.log('成功触发li，并忽略触发ul');
    }
}