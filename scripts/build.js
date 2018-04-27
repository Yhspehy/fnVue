const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const config = require('../config')
const path = require('path')
const ora = require('ora')
const rm = require('rimraf')
const baseWebpackConfig = require('./webpack.base.conf.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const buildWebpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    output: {
        filename: 'js/[name].[chunkhash].js',
        chunkFilename: 'js/[id].[chunkhash].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'fnVue',
            filename: 'index.html',
            template: 'index.html',
            inject: true
        })
    ]
})

module.exports = new Promise((resolve, reject) => {
    const spinner = ora('building for production...')
    spinner.start()

    // 删除原本的dist目录下的文件
    rm(path.join(config.build.assetsRoot), err => {
        if (err) throw err
        resolve(buildWebpackConfig)
    })
})
