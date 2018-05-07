import {
    observe
} from './Observe.js'
import initComputed from './Computed'
import Compile from './Compile.js'

const fnVue = function (options = {}) {
    if (!options || typeof options !== 'object') {
        console.error('please enter options')
        return
    }
    if (!options.data || typeof options.data !== 'function') {
        console.error('options.data is not a function')
        return
    }

    this.$options = options
    this.data = options.data()
    this.computed = {}
    this.method = options.method

    //监听数据
    observe(this.data)

    // 绑定computed
    initComputed(this)

    // 执行created
    if (options.created) options.created.call(this)

    // 编译模板
    Compile(options.el, this)

    // 执行mounted
    if (options.mounted) options.mounted.call(this)
}

export default fnVue