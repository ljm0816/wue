function observe(value) {
    if (!value || typeof value !== 'object') {
        return
    }
    return new Observer(value)
}
/***
 * 实现observer数据劫持
 */
class Observer{
    // 这里暂时考虑转入的value是不同的对象
    constructor (value) {
        this.walk(value)
    }

    /**
     * 深度遍历对象
     * @param obj
     */
    walk (obj) {
        Object.keys(obj).forEach((key) => {
            // 如果是对象， 则递归调用walk,保证每个属性都可以被defineReactive
            if (typeof obj[key] === 'object') {
                this.walk(obj[key])
            }
            defineReactive(obj, key, obj[key])
        })
    }
}

/**
 * 给每个属性调用defineProperty
 * @param obj
 * @param key
 * @param value
 */
let defineReactive = (obj, key, value) => {
    Object.defineProperty(obj, key, {
        set(newVal) {
            if (newVal === value) {
                return
            }
            value = newVal
            // 当设置的属性是个对象，也要继续observe
            observe(newVal)
        },
        get() {
           return value
        }
    })
}

let data = {
    msg: 'hello wue',
    deep: {
        a: 1,
        b: 2
    }
}
observe(data)