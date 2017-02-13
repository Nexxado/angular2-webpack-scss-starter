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
                loader: 'html-loader'
            }, {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            }, {
                test: /\.scss$/,
                exclude: [helpers.root('src', 'app')],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                            loader: 'css-loader',
                            query: {
                                modules: false,
                                sourceMaps: true
                            }
                        },
                        {
                            loader: 'postcss-loader'
                        },
                        {
                            loader: 'sass-loader',
                            query: {
                                sourceMaps: true
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
                            sourceMaps: true
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
            name: ['app', 'vendor', 'polyfills'],
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
