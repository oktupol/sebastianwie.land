const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true,
    },
    optimization: {
        usedExports: true
    },
    module: {
        rules: [{
            test: /\.(sa|sc|c)ss$/i,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader',
            ]
        }]
    },
});