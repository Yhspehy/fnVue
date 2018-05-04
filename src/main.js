import fnVue from './fnVue'

let vm = new fnVue({
    el: '#app',
    data() {
        return {
            aa: {
                b: 3222222222222,
                c: 22
            }
        }
    },
    computed: {
        bb() {
            return 1
        }
    }
})

console.log(vm)
