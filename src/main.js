import fnVue from './fnVue'

let vm = new fnVue({
    el: '#app',
    data() {
        return {
            aa: {
                b: 11,
                c: 22
            }
        }
    },
    computed: {
        bb() {
            return this.data.aa.b + this.data.aa.c
        }
    }
})

console.log(vm)
