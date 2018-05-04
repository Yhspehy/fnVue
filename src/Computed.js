function initComputed(vm) {
    let data = vm.data
    Object.key(vm.computed).forEach((el, idx) => {
        if (data.el) console.error('请不要和data中字段重名')
    })
}

export default initComputed
