const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('./helpers');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts'
    },
    module: {
        rules: [{
            test: /\.ts$/,
            loaders: [{
                loader: 'awesome-typescript-loader',
                options: {
                    configFileName: helpers.root('src', 'tsconfig.json')
                }
            },
                'angular2-template-loader'
            ]
        }, {
            test: /\.html$/,
            loader: 'html-loader',
            query: {
                ignoreCustomFragments: [/\{\{.*?}}/],
                root: helpers.root('src'),
                attrs: ['img:src', 'img:ng-src']
            }
        }, {
            test: /\.(png|jpe?g|gif|svg)$/i,
            loaders: [
                'file-loader?hash=sha512&digest=hex&name=images/[name].[hash].[ext]',
                'image-webpack-loader'
            ]
        }, {
            test: /\.(eot|otf|ttf|woff|woff2)$/i,
            loader: 'file-loader?hash=sha512&digest=hex&name=fonts/[name].[hash].[ext]'
        }, {
            test: /\.scss$/,
            exclude: [helpers.root('src', 'app')],
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: true
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            })
        },
            {
                test: /\.scss$/,
                include: [helpers.root('src', 'app')],
                loaders: [
                    {
                        loader: 'raw-loader'
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/, // The (\\|\/) piece accounts for path separators in *nix and Windows
            helpers.root('./src'), // location of your src
            {} // your Angular Async Route paths relative to this root directory
        ),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'polyfills', 'manifest'],
            minChunks: Infinity
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.HashedModuleIdsPlugin(),
        new InlineManifestWebpackPlugin({
            name: 'webpackManifest'
        }),
        new HtmlWebpackPlugin({
            template: helpers.root('src', 'index.ejs'),
            filename: helpers.root('dist', 'index.html'),
            minify: {
                removeComments: true
            }
        }),
        new ScriptExtHtmlWebpackPlugin({
            defer: [/app/, /vendor/, /polyfills/],
            defaultAttribute: 'async'
        }),
        new ExtractTextPlugin({
            filename: '[name].[contentHash].css',
            allChunks: true
        })
    ],
    resolve: {
        extensions: ['.ts', '.js']
    }
};
