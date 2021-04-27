const { merge } = require('webpack-merge');
const common = require('./webpack.common.babel.js');
var webpack = require('webpack');

const envPlugin =  new webpack.DefinePlugin({
    'process.env': {
        'NODE_ENV': JSON.stringify('development'),
        // 'API_BASE_PATH': JSON.stringify('http://localhost:3100'),
        'API_BASE_PATH':JSON.stringify('http://ec2-13-234-225-190.ap-south-1.compute.amazonaws.com:3100'),
        'BASENAME': JSON.stringify('/'),
        'STATIC_IMAGE_BASE_PATH': JSON.stringify('http://ec2-13-234-225-190.ap-south-1.compute.amazonaws.com:3100/'),
    }
});

module.exports = merge(common, {
   mode: 'development',
   plugins: [envPlugin]
});