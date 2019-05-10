/**
 * 实现Dep订阅器（房产中介）
 */
export default class Dep {
    constructor () {
        // 消息盒子，联系人列表
        this.sub = []
    }
    addDepend () {
        Dep.target.addDep(this)
    }
    addSub (sub) {
        this.sub.push(sub)
    }
    //通知
    notify () {
        for (let sub of this.sub) {
            sub.update()
        }
    }
}

Dep.target = null
const targetStack = []

export function pushTarget (_target) {
    if (Dep.target) {
        targetStack.push(Dep.target)
    }
    Dep.target = _target
}

export  function popTarget() {
    Dep.target = targetStack.pop()
}