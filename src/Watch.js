import Watcher from './Watcher.js'

function Watch(vm, options) {
    let watchObj = options.watch
    Object.keys(watchObj).forEach((key) => {
        let exp = `data.${key}`
        new Watcher(vm, exp, `watch.${key}`, (newVal) => {
            watchObj[key].bind(vm)(newVal)
        })
    })
}

export default Watch