const { merge } = require('webpack-merge');
const common = require('./webpack.common.babel.js');
var webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// import { ReactLoadablePlugin } from 'react-loadable/webpack';

const envPlugin =  new webpack.DefinePlugin({ 
    'process.env': {
      'NODE_ENV': JSON.stringify('production'),
      'API_BASE_PATH':JSON.stringify('http://ec2-13-234-225-190.ap-south-1.compute.amazonaws.com:3100'),
      'BASENAME':JSON.stringify('/'),
      'STATIC_IMAGE_BASE_PATH':JSON.stringify('http://ec2-13-234-225-190.ap-south-1.compute.amazonaws.com:3100/')
    }
});  

const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = merge(common, {
   mode: 'production',
   optimization: {
    minimizer: [
        // we specify a custom UglifyJsPlugin here to get source maps in production
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          uglifyOptions: {
            output: {
                comments: false, // remove comments
            },
            compress: {
                unused: true,
                dead_code: true, 
                // warnings: false, 
                drop_debugger: true,
                conditionals: true,
                evaluate: true,
                drop_console: true, 
                sequences: true,
                booleans: true
            }
          },
          sourceMap: false
        })
      ],
      splitChunks: {
            chunks: 'all'
        }
    },
   plugins: [
       envPlugin,
       new CopyWebpackPlugin(
        { 
          patterns: [
            { from: 'src/.htaccess', to: '.htaccess', toType: 'file' },
            // { from: 'src/firebase-messaging-sw.js', to: 'firebase-messaging-sw.js', toType: 'file' }
          ]
        }
      )
   ]
 });