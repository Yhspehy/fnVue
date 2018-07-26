import build from './buildNewVm.js'


build()


if (module.hot) {
    module.hot.accept('./buildNewVm.js', function () {
        console.log('Accepting the updated module!');
        let vm = build()
    })
}

// module.hot.check(true).then(outdatedModules => {
//     console.log(outdatedModules);
// }).catch(error => {
//     console.log(error);
// });

// module.hot.addStatusHandler(status => {
//     console.log(status);
// })

// module.hot.apply(options).then(outdatedModules => {
//     // 超时的模块……
//     console.log(options.onAccepted);
// }).catch(error => {
//     // 捕获错误
// });