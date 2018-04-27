const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const config = require('../config')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: config.dev.devtool,
    devServer: {
        clientLogLevel: 'warning',
        hot: true,
        compress: true,
        host: HOST || config.dev.host,
        port: PORT || config.dev.port,
        open: config.dev.autoOpenBrowser,
        quiet: true,
        overlay: config.dev.errorOverlay
            ? {
                  warnings: false,
                  errors: true
              }
            : false
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new HtmlWebpackPlugin({
            title: 'fnVue',
            filename: 'index.html',
            template: 'index.html',
            inject: true
        })
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
            onErrors: config.dev.notifyOnErrors
                ? utils.createNotifierCallback()
                : undefined
        })
    )
    resolve(devWebpackConfig)
})
