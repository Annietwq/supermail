// 防抖函数
//第一个参数：是一个函数，第二个参数：是要等多久
export function debounce(func, delay = 50) {
    let timer = null;
    //...表示可以传入多个参数
    return function(...args) {
        if (timer) {
            clearTimeout(timer);
        }
        //setTimeout异步执行 会被放到后面执行
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay)
    }
}

//格式化时间戳
export function formatDate(date, fmt) {
    //1.获取年份
    // y+ 1个或者多个y
    // y* 0个或者多个y
    // y? 0个或者1个
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }

    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
}

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}