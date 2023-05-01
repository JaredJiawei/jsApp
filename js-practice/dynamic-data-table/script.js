//0 获取tbody 标签
const tbody = document.querySelector('tbody');

//1.提前准备好的数据users
const users = [
    {id:1, name:'Billy', age:20},
    {id:2, name:'Buck', age:22},
    {id:3, name:'Alias', age:30}
];

//2.循环遍历users 得到 对象
for(let i = 0; i < users.length; i ++){
    let item = users[i];
    console.log(item);
    //2.1 每得到一个对象objbect 创建一个标签 tr 元素
    let tr = document.createElement('tr');

    //每创建一个tr后，循环遍历此对象，
    for(let key in item){
        //每遍历一次，创建一个td 元素
        var td = document.createElement('td');
        //td 元素 赋值 此遍历
        td.innerHTML = item[key]; 
        // td 元素 插入 tr 元素
        tr.appendChild(td);
    }

    // tr 元素插入 tbody 
    tbody.appendChild(tr);
}