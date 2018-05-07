import Dep from './Dep.js'

function Watcher(vm, exp, node, fn) {
    this.vm = vm
    this.exp = exp
    this.fn = fn
    this.node = node
    Dep.target = this
    // 获取下值从而将this放进dep中
    // 本来我是通过在这里直接执行update()来获取值，随便赋值
    // 但是我发现这种方法在一个表达中包含多个{{}}的时候
    // 会重复添加相同的this进dep，故舍去
    let val = exp.split('.').reduce((val, key) => {
        return val[key]
    }, vm)
    Dep.target = null
}

Watcher.prototype.update = function() {
    this.fn()
}

export default Watcher
