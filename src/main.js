import fnVue from './fnVue'

let vm = new fnVue({
    el: '#app',
    data() {
        return {
            aa: {
                b: 3222222222222
            }
        }
    }
})

console.log(vm)
