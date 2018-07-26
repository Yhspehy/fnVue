import Dep from './Dep.js'
import Watcher from './Watcher.js'

function initComputed(vm) {
    let data = vm.data
    let computed = vm.$options.computed
    Object.keys(computed).forEach((key, idx) => {
        if (data.key) console.error('请不要和data中字段重名')
        // 创建Dep对象
        let dep = new Dep()

        // 获取computed中的绑定的值
        let exp = computed[key].toString()
        let match = exp.match(/this\.(.*?)[\s;]/g)


        // 将computed中的this绑定到vm实例中
        computed[key] = computed[key].bind(vm)

        // val为初始状态的值
        let val = computed[key]()

        match.forEach(exp => {
            let Exp = exp.match(/this\.(.*)[\s;]/)[1]
            new Watcher(vm, Exp, `computed.${key}`, () => {
                // 每次computed中的值改变同时修改vm.computed[key]的值
                vm.computed[key] = computed[key]()
            })
        })

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
                dep.notify(key)
            }
        })

        Object.defineProperty(vm.computed, '_ob_', {
            configurable: true,
            writable: true,
            value: dep
        })
    })
}

export default initComputed