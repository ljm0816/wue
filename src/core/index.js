import proxy from './instance/proxy'
import initOptions from './instance/init'
import Compiler from './compile'
import Watcher from './observer/Watcher'

export default class Wue {
    constructor (options) {
        let vm = this
        vm.$options = options
        vm.$watch = function (key, cb) {
            new Watcher(vm, key, cb)
        }
        initOptions(vm)
        for (let key in vm._data) {
            proxy(vm, '_data', key)
        }
        /*new Compiler(vm.$options.el, vm)*/
    }
}