import build from './buildNewVm'

if (module.hot) {
    module.hot.accept('./buildNewVm.js', () => {
        console.log(22);
        build()
    })
}

build()