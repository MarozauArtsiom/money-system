const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './package-lock.jsonsrc/index.html',
    filename: 'index.html',
    inject: 'body'
});

let config = {
    entry: 'src/index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    },
    plugins: [HtmlWebpackPluginConfig]
}

module.exports = config;