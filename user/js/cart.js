// 购物车页面的逻辑

// 1 验证登录

const token = window.localStorage.getItem('token')
const id = window.localStorage.getItem('id')

if(!token | !id) {
    window.location.href = './login.html'
} else {
    // 请求商品购物车数据，进行渲染
    getCartList()
}

// 2. 获取购物车列表
function getCartList() {
    //2-1 发送请求
    $.ajax({
        url:'http://localhost:5500/cart/list',
        method:'get',
        data:{id:id},
        headers: {authorization: token},
        success(res) {
            console.log(res)
            // 判断失败
            if(res.code !== 1) {
                window.location.href = './login.html'
                return
            }
            
            // 渲染页面 
            bindHtml(res)
        }
    })
}

// 3. 渲染页面
function bindHtml(res) {
    // 3-1 判断渲染 empty 标签 还是 list 标签
    if(!res.cart.length) {
        $('.empty').addClass('active')
        $('.list').removeClass('active')
        return
    }
    // 代码能来到这里，说明购物车是有数据的
    // 渲染页面
    console.log(res.cart)

    // 3-2 统计一些数字
    // 一共有多少个选中的
    // 一共有多好种商品
    // 总价是多少

    let selectNum = 0, totalPrice = 0, totalNum = 0
    res.cart.forEach(item => {
        if(item.is_select) {
            selectNum ++
            totalNum += item.cart_number
            totalPrice += item.cart_number * item.current_price
        }
    })

    // 3-3 渲染页面
    let str = `
            <div class="top">
                全选 <input class="selectAll" type="checkbox" ${ selectNum === res.cart.length ? 'checked' : '' }>
            </div>
            <ul class="center">
                `
                res.cart.forEach(item => {
                    str += `
                        <li>
                            <div class="select">
                                <input ${ item.is_select ? 'checked' : '' } type="checkbox" goodsId=" ${ item.goods_id } ">
                            </div>
                            <div class="show">
                                <img src="${item.img_small_logo}" alt="">
                            </div>
                            <div class="title">
                                ${ item.title }
                            </div>
                            <div class="price">$ ${ item.current_price }</div>
                            <div class="number">
                                <button goodsId = "${ item.goods_id }" class="sub">-</button>
                                <input class="cart_number" type="text" value=" ${ item.cart_number } ">
                                <button goodsId = "${ item.goods_id }" class="add">+</button>
                            </div>
                            <div class="subPrice">$ ${ item.current_price * item.cart_number.toFixed(2) }</div>
                            <div class="destory">
                                <button goodsId = "${ item.goods_id }" class="del">删除</button>
                            </div>
                        `
                })

                str += `
                </li>
            </ul>
            <div class="bottom">
                <p>
                    共计 <span>${ totalNum }</span> 件商品
                </p>
                <div class="btns">
                    <button class="clear">清空购物车</button>
                    <button class="clear_complete" ${ selectNum === 0 ? 'disabled' : '' }>删除所有已选中</button>
                    <button class="pay" ${ selectNum === 0 ? 'disabled' : '' }>去支付</button>
                </div>
                <p>
                    共计 $<span>${ totalPrice.toFixed(2) }</span> 
                </p>
            </div>`

            $('.list').html(str)
}


    // 4. 各种点击事件
    // 4-1 修改单一商品选中
    $('.list').on('click', '.center .select input', function () {
        console.log('修改选中状态')
        // 拿到对应的信息发送请求
        $.ajax({
            url: 'http://localhost:5500/cart/select',
            method: 'post',
            headers: {  authorization: token },
            data: { id:id, goodsId: $(this).attr('goodsId')},
            success (res) {
                console.log(res)
            }
        })

        // 从新渲染页面
        getCartList()
    })

    // 4-2 修改单一商品数量增加
    $('.list').on('click', '.center .number .add', function () {
        $.ajax({
            url: 'http://localhost:5500/cart/number',
            method: 'post',
            headers: { authorization: token },
            data: { 
                    id:id,
                    number: $(this).prev().val() - 0 + 1,
                    goodsId: $(this).attr('goodsId')
                  },
            success(res){
                console.log(res)
            }
        })

        // 從新渲染頁面
        getCartList()
    })


    // 4-3 修改单一商品数量 減少
    $('.list').on('click', '.center .number .sub', function () {
        // 發送請求
        // 需要判斷一下， 如果當前商品數量是 1 ， 那麼不能繼續減少 “-” 操作了
        const number = $(this).next().val() - 0

        if(number <= 1) return

        $.ajax({
            url: 'http://localhost:5500/cart/number',
            method: 'post',
            headers: { authorization: token },
            data: { 
                    id:id,
                    number: $(this).next().val() - 0 - 1,
                    goodsId: $(this).attr('goodsId')
                  },
            success(res){
                console.log(res)
            }
        })

        // 從新渲染頁面
        getCartList()
    })


    // 4-4 刪除單一商品 
    $('.list').on('click', '.center .destory .del', function(){
        console.log('執行刪除操作')
        // 發送請求
        $.ajax({
            url:'http://localhost:5500/cart/remove',
            data: {id: id, goodsId: $(this).attr('goodsId')},
            headers: { authorization: token},
            method: 'get',
            success(res) {
                console.log(res)
            }
        })

        // 從新渲染頁面
        getCartList()
    })

    // 4-5 全選事件
    $('.list').on('click', '.selectAll', function(){
        // 拿到自己的選中狀態
        const type = $(this).prop('checked') ? '1' : '0'
        console.log(type)
        // 發送請求
        $.ajax({
            url:'http://localhost:5500/cart/select/all',
            method:'post',
            data: { id:id, type: type },
            headers: { authorization: token}
        })

        // 從新渲染頁面
        getCartList()
    })

    // 4-6 清空購物車
    $('.list').on('click', '.clear', function(){
        console.log('清空購物車')
        $.ajax({
            url:'http://localhost:5500/cart/clear',
            data: { id:id },
            headers: { authorization: token },
            method: 'get'
        })
        // 從新渲染頁面
        getCartList()
    })
    // 4-7 删除所有选中的購物車
    $('.list').on('click', '.clear_complete', function(){
        console.log('刪除所有已选择的購物車')
        // 发送请求
        $.ajax({
            url:'http://localhost:5500/cart/remove/select',
            method: 'get',
            data: { id:id },
            headers: { authorization: token},
            success(res){
                console.log(res)
            }
        })
        // 从新渲染页面
        getCartList()

    })
    // 4-8 支付
    $('.list').on('click', '.pay', function(){
        console.log('支付')
        $.ajax({
            // 本地服务器，没有支付接口
        })
    })