//1.获取元素 elements
const allBtn = document.querySelector('input');
const items = document.querySelectorAll('.selects');

console.log(allBtn);
console.log(items);

//2.给全选按钮添加绑定事件
allBtn.onclick = function(){
    //2.1 拿到自己的状态
    const type = allBtn.checked;
    console.log(type);
    //2.2 把自己的状态复制给每一个选项的状态
    for(let i =0;i < items.length ;i ++){
        //0 1 2 3
        items[i].checked = type; 
    }
}

//3.循环给每一个选项
for(let i = 0; i < items.length; i ++){
    //3.1给每一个按钮绑定点击事件
    items[i].onclick = function(){
        //3.2使用假设变量，判断是不是全部选项按钮都是选中的
        let flag = true;

        //3.3通过循环来验证假设
        for(let j = 0; j < items.length; j ++){
            if(items[j].checked === false){
               flag = false;
               break;
            } 
        }
        console.log(flag);
        allBtn.checked = flag;
    }
} 