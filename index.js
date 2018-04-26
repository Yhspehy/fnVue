const fnVue = function(options = {}) {
    if (!options || typeof options !== 'object') {
        console.error('please enter options')
        return
    }
    if (!options.data || typeof options.data !== 'function') {
        console.error('options.data is not a function')
        return
    }
    const self = this
    this.$opitions = options
    this.data = options.data()
    observe(this.data)
    Compile(options.el, this)
}

function observe(data) {
    if (!data || typeof data !== 'object') return
    return new Observe(data)
}

function Observe(data) {
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
                dep.notify()
            }
        })
    }
    Object.defineProperty(data, '_ob_', {
        configurable: true,
        writable: true,
        value: dep
    })
}

function Watcher(vm, exp, node, fn) {
    this.vm = vm
    this.exp = exp
    this.fn = fn
    this.node = node
    Dep.target = this
    this.update(vm[exp])
    Dep.target = null
}
Watcher.prototype.update = function() {
    let arr = this.exp.split('.')
    let val = this.vm
    arr.forEach(key => {
        val = val[key]
    })
    this.fn(val)
}

function Dep() {
    this.subs = []
}
Dep.prototype = {
    addSub(sub) {
        this.subs.push(sub)
    },
    notify() {
        this.subs.forEach(e => e.update())
    }
}

function Compile(el, vm) {
    vm.$el = document.querySelector(el)
    let fragment = document.createDocumentFragment()

    while ((child = vm.$el.firstChild)) {
        fragment.appendChild(child)
    }

    function replace(frag) {
        Array.from(frag.childNodes).forEach(node => {
            let txt = node.textContent
            let reg = /\{\{(.*?)\}\}/g
            if (node.nodeType === 3 && reg.test(txt)) {
                new Watcher(vm, RegExp.$1, node, newVal => {
                    node.textContent = txt.replace(reg, newVal).trim()
                })
            }
            if (node.childNodes && node.childNodes.length) {
                replace(node)
            }
        })
    }

    replace(fragment)

    vm.$el.appendChild(fragment)
}
