// 详情页的逻辑
// 1. 验证是否是列表页调转过来的
const goodsId = window.localStorage.getItem('goodsId')

if(!goodsId) window.location.href = './list.html'

//2. 根据商品ID 请求商品信息
getInfo()
function getInfo() {
    // 直接发送请求
    $.get('http://localhost:5500/goods/item/', {id: goodsId }, res => {
        console.log(res)
        // 使用信息填充页面
        $('.show > img').prop('src', res.info.img_big_logo)
        $('.info > .title').text(res.info.title)
        $('.info > .price').text('$' + res.info.current_price)
    })
}