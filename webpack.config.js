/* global __dirname, require, module*/

const webpack = require('webpack');
//const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const env = require('yargs').argv.env; // use --env with webpack 2
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

let libraryName = 'polaris-vue';
let libraryNameCamelCase = 'PolarisVue';

let plugins = [], outputFile;

if (env === 'build') {
    plugins.push(new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }));
    outputFile = libraryName + '.min.js';
} else {
    plugins.push(new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"development"'
        }
    }));
    outputFile = libraryName + '.js';
}

plugins.push(new MiniCssExtractPlugin({filename: libraryName + '.css'}));

const config = {
    mode: env === 'build' ? 'production' : 'development',
    entry: __dirname + '/src/index.js',
    devtool: env === 'build' ? false : 'source-map',
    output: {
        path: __dirname + '/lib',
        filename: outputFile,
        library: libraryNameCamelCase,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.(css|sass|scss)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            // Prefer `dart-sass`
                            implementation: require("sass"),
                        },
                    }
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            },
        ]
    },
    resolve: {
        modules: [path.resolve('./node_modules'), path.resolve('./src')],
        extensions: ['.json', '.js', '.vue'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
    },
    plugins: plugins,
    externals: {
        vue: 'vue'
    },
    optimization: {
        minimizer: [new TerserPlugin({
            terserOptions: {
                compress: {
                    drop_console: true,
                }
            }
        })]
    },
    performance: {hints: false},
};

module.exports = config;
