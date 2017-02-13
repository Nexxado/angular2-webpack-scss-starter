/**
 * Created by ND88-GS60 on 08/08/2016.
 */

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
    devtool: 'inline-source-map',
    entry: {
        app: './src/main.ts',
        vendor: './src/vendor.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '',
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js'
    },
    module: {
        rules: [{
            test: /\.ts$/,
            enforce: 'pre',
            use: ['tslint-loader']
        }, {
            test: /\.ts$/,
            use: ['awesome-typescript-loader'],
            exclude: /node_modules/
        }],
        noParse: [/zone\.js\/dist\/.+/, /angular2\/bundles\/.+/]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor'],
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body',
            minify: {
                removeComments: true
            }
        })
    ],
    resolve: {
        extensions: ['.ts', '.js']
    }
};