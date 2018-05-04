import Dep from './Dep.js'

function Watcher(vm, exp, node, fn) {
  this.vm = vm
  this.exp = exp
  this.fn = fn
  this.node = node
  Dep.target = this
  // 统一在第一个添加进dep的时候去取值
  this.update()
  Dep.target = null
}

Watcher.prototype.update = function() {
  let expArr = this.exp.split('.')
  let value = expArr.reduce((val, key) => val[key], this.vm)
  this.fn(value)
}

export default Watcher
