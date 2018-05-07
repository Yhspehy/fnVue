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
    },
    created() {
        console.log('create')
    },
    mounted() {
        console.log('mounted')
    },
    method: {
        aa() {
            console.log('method-aa')
            this.data.aa.b = 33
        }
    }
})

console.log(vm)