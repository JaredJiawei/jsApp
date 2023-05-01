//1. 获取元素
const selAll = document.querySelector('input');
const selOpts = document.getElementsByClassName('selects');

//2.给全选按钮绑定事件
selAll.onclick = function(){
    //3.获取自己的状态
    let selAllState = selAll.checked;
    console.log(selAllState);
    //4.给所有的选项按钮设置成自己的状态
    for(let i = 0; i < selOpts.length; i++ ){
        selOpts[i].checked = selAllState;
    }
}
//5.给每一个选项按钮，绑定事件
for(let i = 0; i < selOpts.length; i++){
    //5.1给每一个选项按钮添加绑定事件
    selOpts[i].onclick = function(){
        //5.2 假设一个变量，做判断
        let flag = true;
        for(let j = 0; j < selOpts.length; j++){
            if( selOpts[j].checked === false ){
                flag = false;
                break;
            }
        }
        selAll.checked = flag;
    }
}