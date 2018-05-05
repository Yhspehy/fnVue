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
            return this.data.aa.b
        }
    }
})

console.log(vm)

function pp() {
    return this.a.c + this.b
}

let match = pp.toString().match(/(this\..*)\s/)

console.log(match)
