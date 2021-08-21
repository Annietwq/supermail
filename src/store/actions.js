import { ADD_COUNTER, ADD_TO_CART } from './mutations-types'
export default {
    addCart(context, payload) {
        //1.payload新添加的商品
        //方法1：
        // let oldProduct = null;
        // for (let item of state.cartList) {
        //     if (item.iid === payload.iid) {
        //         oldProduct = item;
        //     }
        // }
        //2.判断oldProduct是否有值
        // if (oldProduct) {
        // 	oldProduct.count += 1;
        // } else {
        // 	payload.count = 1;
        // 	state.cartList.push(payload);
        // }

        // 方法2：
        // let index = state.cartList.indexOf(payload);
        // if (index === -1) {
        // 	let oldProduct = state.cartList[index];
        // 	oldProduct.count += 1;
        // }else{
        // 	payload.count = 1;
        // 	state.cartList.push(payload);
        // }

        //方法3：查找之前数组中是否有该商品
        return new Promise((resolve, reject) => {
            //1.查找之前数组中是否有该商品
            let oldProduct = context.state.cartList.find(item => {
                    return item.iid === payload.iid;
                })
                //2.判断oldProduct
            if (oldProduct) {
                // oldProduct.count += 1;
                context.commit(ADD_COUNTER, oldProduct)
                resolve('当前商品数量+1');
            } else { //添加新的商品
                payload.count = 1;
                // context.state.cartList.push(payload);
                context.commit(ADD_TO_CART, payload);
                resolve('添加新的商品');
            }
        })


    }
}