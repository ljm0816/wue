/**
 * 访问属性通过this._data.xxx不优雅，所以我们设置一层代理，从新进行一次数据访问拦截，这样就可以直接访问this.xxx了
 * @param target
 * @param sourceKey
 * @param key
 */
export default function proxy (target, sourceKey, key) {
    Object.defineProperty(target, key, {
        configurable: true,
        get: function proxyGetter () {
            return target[sourceKey][key]
        },
        set: function proxySetter (newVal) {
            target[sourceKey][key] = newVal
        }
    })
}