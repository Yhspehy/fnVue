import Dep from './Dep.js'
export function observe(data) {
    if (!data || typeof data !== 'object') return
    return new Observe(data)
}
export function Observe(data) {
    if (!data) return
    let dep = new Dep()
    for (let key in data) {
        let val = data[key]
        observe(val)
        Object.defineProperty(data, key, {
            configurable: true,
            get() {
                if (Dep.target) {
                    dep.addSub(Dep.target)
                }
                return val
            },
            set(newVal) {
                if (newVal === val) return
                val = newVal
                dep.notify(key)
            }
        })
    }
    Object.defineProperty(data, '_ob_', {
        configurable: true,
        writable: true,
        value: dep
    })
}