import Dep from './Dep.js'
import Watcher from './Watcher.js'

function initComputed(vm) {
    let data = vm.data
    let computed = vm.$opitions.computed
    Object.keys(computed).forEach((key, idx) => {
        if (data.key) console.error('请不要和data中字段重名')
        // 创建Dep对象
        let dep = new Dep()
        // 将computed中的this绑定到vm实例中
        computed[key] = computed[key].bind(vm)
        let val = computed[key]()
        console.log(computed[key])
        let exp = computed[key].toString()
        console.log(exp)
        let match = exp.match(/(this\..*)?\s/)
        console.log(match)
        Object.defineProperty(vm.computed, key, {
            get() {
                if (Dep.target) {
                    dep.addSub(Dep.target)
                }
                return val
            },
            set(newVal) {
                if (newVal === val) return
                val = newVal
                dep.notify()
            }
        })
    })
}

export default initComputed
