//0. 
var pic = document.querySelector('img');


//1. 
document.onmousemove = function(e){
    console.log('Moving');
    var x = e.clientX;
    var y = e.clientY;
    console.log(x,y);
    pic.style.left = x + 5 + 'px';
    pic.style.top = y + 5 +'px';
}
