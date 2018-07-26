import {
    observe
} from './Observe.js'
import initComputed from './Computed'
import Compile from './Compile.js'
import Watch from './Watch.js'

const fnVue = function (options = {}) {
    if (!options || typeof options !== 'object') {
        console.error('please enter options')
        return
    }
    if (!options.data || typeof options.data !== 'function') {
        console.error('options.data is not a function')
        return
    }
    if (window.fnVue) {
        let n_data = options.data()
        let o_data = window.fnVue.data


        function compare_data(data, old) {
            try {
                for (let key in data) {
                    if (typeof data[key] === 'object') {
                        compare_data(data[key], old[key])
                        return
                    }
                    // if (Object.prototype.toString.call(data[key]) === '[Object Array]') {
                    //     return
                    // }
                    if (data[key] !== old[key]) old[key] = data[key]
                }
            } catch (error) {
                console.error(error);
            }

        }
        compare_data(n_data, o_data)
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

    if (options.watch) Watch(this, options)

    window.fnVue = this
}

export default fnVue