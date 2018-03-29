const path = require('path'); 
var config = {
    mode:'development',
    entry: './src/main.js', //entry point where /App is appended to root thats in html.
    output: {
        path: path.resolve(__dirname, 'build'), 
        filename: 'bundle.js',
    },
    devServer: {
        inline: true, //autorefresh
        port: 8080
    },
    module:{
        rules:[ // was 'loaders'. Had to be changed to rules for webpack 4+
            {
                test: /\.jsx?$/, //search for js files
                exclude:/node_modules/, 
                loader: 'babel-loader',
                query:{
                    presets:['es2015','react'] //use es2015 and react
                }
            }, 
            {
                test: /css$/,
                exclude: /node_modules/,
                loaders: ['style-loader', 'css-loader']
            }
        ]
    }
}
module.exports = config;