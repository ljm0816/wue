/**
 * 订阅者（即找房子的人），用来接收消息
 */
import {popTarget, pushTarget} from "./dep"

export default class Watcher {
    constructor (vm, expression, cb) {
        this.vm = vm
        this.cb = cb
        this.expression = expression // 传入的属性名
        this.value = this.getVal()
    }
    getVal () {
        pushTarget(this) // 建立联系

        //这里取值，会触发value的get方法，所以接下来我们需要在get方法里面将联系人的联系方式给中介
        let val = this.vm
        this.expression.split('.').forEach((key) => {
            val = val[key]
        })

        popTarget() // 释放关联
        return val
    }

    /**
     * 联系人把自己的联系方式给中介
     * @param dep
     */
    addDep (dep) {
        dep.addSub(this)
    }

    /**
     * 收到消息后，开始准备活动
     */
    update () {
        let val = this.vm
        this.expression.split('.').forEach((key) => {
            val = val[key]
        })
        this.cb.call(this.vm, val, this.value)
    }
}