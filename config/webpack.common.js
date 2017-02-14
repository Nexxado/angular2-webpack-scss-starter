var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

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
                use: [
                    'file-loader?hash=sha512&digest=hex&name=images/[name].[hash].[ext]',
                    'image-webpack-loader'
                ]
            }, {
                test: /\.(eot|otf|ttf|woff|woff2)$/i,
                loader: 'file-loader?hash=sha512&digest=hex&name=fonts/[name].[hash].[ext]'
            }, {
                test: /\.scss$/,
                exclude: [helpers.root('src', 'app')],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                            loader: 'css-loader',
                            query: {
                                modules: false,
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader'
                        },
                        {
                            loader: 'sass-loader',
                            query: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.scss$/,
                include: [helpers.root('src', 'app')],
                use: [{
                        loader: 'raw-loader'
                    },
                    {
                        loader: 'sass-loader',
                        query: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            }
        ]
    },

    plugins: [
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            helpers.root('./src'), // location of your src
            {} // a map of your routes
        ),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'polyfills', 'manifest'],
            minChunks: Infinity
        }),

        new HtmlWebpackPlugin({
            template: 'src/index.html',
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
