//1.准备数据
var arr = [
    {id:1, name:'Billy', age:22},
    {id:2, name:'Bica', age:21},
    {id:3, name:'wacop', age:24}
]

//1.1.获取tbody 元素
const tbody = document.querySelector('tbody');

//2.循环遍历拿到 arr 数据
arr.forEach(function(item){
    console.log(item);
    const tr = document.createElement('tr');
    for(let key in item){
        const td = document.createElement('td');
        console.log(item[key]);
        td.innerHTML = item[key];
        tr.appendChild(td);
    }
    tbody.appendChild(tr);
    }
)
