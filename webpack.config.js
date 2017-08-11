const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsPlugin = require('favicons-webpack-plugin');

const buildDir = path.resolve(__dirname, './build');
const imgDir = path.resolve(__dirname, './src/assets/images');

module.exports = {
    entry: './src/scripts/index.js',
    output: {
        path: buildDir,
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: 'babel-loader'
            },
            {
                test: /\.(css|scss)$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: 'css-loader'
                    }, {
                        loader: 'sass-loader'
                    }],
                    fallback: 'style-loader'
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new FaviconsPlugin({
            logo: path.resolve(imgDir, 'favicon.png'),
            icons: {
                android: false,
                appleIcon: true,
                appleStartup: false,
                favicons: true,
                firefox: false,
            }
        })
    ],
    resolve: {
        alias: {
            styles: path.resolve(__dirname, 'src/styles/'),
            scripts: path.resolve(__dirname, 'src/scripts/'),
            assets: path.resolve(__dirname, 'src/assets/')
        }
    },
    devtool: 'source-map',
    devServer: {
        contentBase: buildDir,
        port: 9000
    }
}