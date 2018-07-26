const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const config = require('../config')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: config.dev.devtool,
    devServer: {
        inline: true,
        clientLogLevel: 'warning',
        hot: true, // 启动热加载
        compress: true, // 启动gzip压缩
        host: HOST || config.dev.host,
        port: PORT || config.dev.port,
        open: config.dev.autoOpenBrowser,
        noInfo: false,
        quiet: true, // 初始启动信息之外的任何内容都不会被打印到控制台
        overlay: config.dev.errorOverlay ? {
            warnings: false,
            errors: true
        } : false
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'fnVue',
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.HotModuleReplacementPlugin()
    ]
})

module.exports = new Promise((resolve, reject) => {
    devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: [
                    `Your application is running here: http://${
                        devWebpackConfig.devServer.host
                    }:${devWebpackConfig.devServer.port}`
                ]
            },
            onErrors: config.dev.notifyOnErrors ?
                utils.createNotifierCallback() : undefined
        })
    )
    resolve(devWebpackConfig)
})