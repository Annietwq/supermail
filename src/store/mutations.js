import { ADD_COUNTER, ADD_TO_CART } from './mutations-types'
export default {
    //mutations唯一的目的：修改state中状态
    // mutations中的每一个方法尽可能完成的事情比较单一
    [ADD_COUNTER](state, payload) {
        payload.count += 1;
    },
    [ADD_TO_CART](state, payload) {
        payload.checked = true;
        state.cartList.push(payload);
    }
}