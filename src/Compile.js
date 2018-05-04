import Watcher from './Watcher.js'

// 编译阶段
function Compile(el, vm) {
    vm.$el = document.querySelector(el)

    // 创建一个DocumentFragment对象
    let fragment = document.createDocumentFragment(),
        child

    // 为什么可以依次append元素
    // 具体原理我也不是很清楚
    // 但是可以肯定的是，这是与fragment相关的，并不是网上所说的appendChild的相关特性
    // 因为如果你注释掉fragment.appendChild(child)，替换成console.log(child)
    // 会发现这个页面内存爆炸了
    // 所以我猜想，可能在往fragment中append的时候时先创建一个el副本
    // 他每次从append的同时也删除那个副本中的那个节点
    while ((child = vm.$el.firstChild)) {
        fragment.appendChild(child)
    }

    function replace(frag) {
        Array.from(frag.childNodes).forEach(node => {
            let txt = node.textContent
            let reg = /\{\{(.*?)\}\}/g

            // 文本节点
            if (node.nodeType === 3 && reg.test(txt)) {
                function replaceTxt() {
                    node.textContent = txt.replace(reg, (matched, expList) => {
                        new Watcher(vm, expList, node, newVal => {
                            node.textContent = txt
                                .replace(reg, (matched, expList) => {
                                    return expList
                                        .split('.')
                                        .reduce((val, key) => {
                                            return val[key]
                                        }, vm)
                                })
                                .trim()
                        })
                        return expList.split('.').reduce((val, key) => {
                            return val[key]
                        }, vm)
                    })
                }
                replaceTxt()
            }

            // 元素节点，input
            if (node.nodeType === 1) {
                let nodeAttr = node.attributes
                nodeAttr.length > 0 &&
                    Array.from(nodeAttr).forEach(attr => {
                        let name = attr.name
                        let exp = attr.value
                        let expArr = exp.split('.')

                        // v-model的情况
                        if (name === 'v-model') {
                            new Watcher(vm, exp, node, newVal => {
                                node.value = newVal
                            })
                            node.addEventListener('input', e => {
                                let newVal = e.target.value

                                // 依次查询并赋值
                                // 这里不能直接vm[exp]
                                let value = vm
                                expArr.forEach((e, idx) => {
                                    if (idx + 1 < expArr.length) {
                                        value = value[e]
                                    } else {
                                        value[e] = newVal
                                    }
                                })
                            })
                        }
                    })
            }

            // 如果有子节点，则继续递归
            if (node.childNodes && node.childNodes.length) {
                replace(node)
            }
        })
    }

    replace(fragment)

    vm.$el.appendChild(fragment)
}

export default Compile
