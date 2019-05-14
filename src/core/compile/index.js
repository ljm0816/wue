export default class Compile {
    constructor (el, vm) {
        vm.$el = document.querySelector(el)
        this.replace(vm.$el, vm)
    }
    replace (frag, vm) {
        Array.from(frag.childNodes).forEach(node => {
            let txt = node.textContent
            //正则匹配{{}}
            let reg = /\{\{(.*?)\}\}/g
            // 如果是文本节点，且包含{{}}
            if (node.nodeType === 3 && reg.test(txt)) {
                debugger
                let arr = RegExp.$1.split('.')
                let val = vm
                arr.forEach(key => {
                    val = val[key]
                });
                node.textContent = txt.replace(reg, val).trim()
                vm.$watch(RegExp.$1, function (newVal) {
                    node.textContent = txt.replace(reg, newVal).trim()
                })
            }

            // 如果是元素节点
            if (node.nodeType === 1) {
                let nodeAttr = node.attributes
                Array.from(nodeAttr).forEach(attr => {
                    let name = attr.name
                    let exp = attr.value
                    // 如果是通过 v- 指令绑定的元素，则设置节点的value为绑定的相应的值
                    if (name.includes('v-')){
                        node.value = vm[exp]
                    }
                    // 监听变化
                    vm.$watch(exp, function(newVal) {
                        node.value = newVal
                    });

                    node.addEventListener('input', e => {
                        let newVal = e.target.value
                        let arr = exp.split('.')
                        let val = vm
                        // 考虑到 v-model="deep.a" 这种情况
                        arr.forEach((key, i)=> {
                            if (i === arr.length - 1) {
                                val[key] = newVal
                                return
                            }
                            val = val[key]
                        });
                    });
                });
            }

            // 如果还有子节点，继续递归replace
            if (node.childNodes && node.childNodes.length) {
                this.replace(node, vm)
            }
        })
    }
}