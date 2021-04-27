const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const path = require('path');

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
  });

const miniCssPlugin = new MiniCssExtractPlugin({
    filename: "styles/[name].css"
  });

// const serviceWorkerWebpackPlugin = new ServiceWorkerWebpackPlugin({
//      entry: path.join(__dirname, './src/firebase-messaging-sw.js'),
//   });


module.exports = {
    entry: {
        client: ['./src/index.jsx']
    },
   output: {
       path: path.join(__dirname, 'dist'),
       filename: '[name].[chunkhash].bundle.js',        
       chunkFilename: '[name].[chunkhash].bundle.js',
       publicPath: '',
    },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.js(x?)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      },
      

      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },


      {
      test: /\.css/,
      use: [
        'css-hot-loader',
        MiniCssExtractPlugin.loader,
        'css-loader'
      ]
    },
      {
        test: /\.(png|jpeg|jpg|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  performance: {
        hints: "warning"
    },
  devServer: {
    historyApiFallback: true,
    headers: { "Access-Control-Allow-Origin": "*" }
  },
  //plugins: [htmlPlugin, miniCssPlugin]
  plugins: [htmlPlugin, miniCssPlugin]
};

