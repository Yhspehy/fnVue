function Dep() {
    this.subs = []
}
Dep.prototype = {
    addSub(sub) {
        this.subs.push(sub)
    },
    notify(key) {
        this.subs.forEach(e => {
            // 判断是否是当前的key触发的update
            if (e.exp.match(/.*\.(.*)$/)[1] === key) {
                e.update()
            }
        })
    }
}

export default Dep
