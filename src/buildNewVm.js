import fnVue from './fnVue'

export default function build() {
    new fnVue({
        el: '#app',
        data() {
            return {
                aa: {
                    b: 112,
                    c: 2
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
                this.data.aa.b = 3312
            }
        },
        watch: {
            'aa.b': function (val) {
                console.log(val)
                this.data.aa.c = 44
            }
        }
    })
}