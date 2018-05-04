import Compile from './Compile.js'
import { observe } from './Observe.js'

const fnVue = function(options = {}) {
    if (!options || typeof options !== 'object') {
        console.error('please enter options')
        return
    }
    if (!options.data || typeof options.data !== 'function') {
        console.error('options.data is not a function')
        return
    }

    this.$opitions = options
    this.data = options.data()
    this.computed = options.computed || {}

    //监听数据
    observe(this.data)

    // 编译模板
    Compile(options.el, this)
}

export default fnVue
