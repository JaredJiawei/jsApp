//1.设置参数，type, 当type 为 true 转下一张， 当type 为false 转上一张

//2.设置参数， index 表示当前张， 默认为0
 
//3.获取图片li，和焦点li 元素
var imgs = document.querySelectorAll('ul>li');
var points = document.querySelectorAll('ol>li');
var banner = document.querySelector('.banner');

console.log(imgs);
console.log(points);

//4.1.设置参数， index 表示当前张， 默认为0
var index = 0;
//4. changeOne() 
function changeOne(type){
    //4.2. 取消当前 active class ， 隐藏当前图片
    imgs[index].className = '';
    points[index].className = '';
    //4.3.设置参数，type, 当type 为 true 转下一张， 当type 为false 转上一张

    if(type === true){
        index++;
    }else if(type === false){
        index--;
    }else{
        index = type;
    }

    //index 最大最小范围固定 
    if(index > imgs.length -1){
        index = 0;
    }
    if(index < 0){
        index = imgs.length -1;
    }

    //显示更新后的imgs[index] 和 points[index]
    imgs[index].className = 'active';
    points[index].className = 'active';
}

banner.onclick = function(e){
  if(e.target.className === 'left')
{    console.log('click left');
    changeOne(false);}
  if(e.target.className === 'right')
{    console.log('click right')
    changeOne(true);}
  if(e.target.dataset.name === 'point')
{    console.log('click box')
    var i = e.target.dataset.id-1;
    changeOne(i);}
}

setInterval(function(){
    //切换下一张
    changeOne(true);
}, 5000)