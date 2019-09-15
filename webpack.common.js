const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,
            }
        })
    ],
    output: {
        filename: '[name].[hash].bundle.js',
        path: path.resolve(__dirname, 'docs')
    },
    module: {
        rules: [{
            test: /\.(woff2?|eot|ttf|otf)$/,
            use: [
                'file-loader'
            ],
        }]
    }
};