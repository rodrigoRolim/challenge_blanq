const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
 module: {
     rules: [
      {
       test: /\.vue$/,
       loader: 'vue-loader'
     },
     // this will apply to both plain `.js` files
     // AND `<script>` blocks in `.vue` files
     {
       test: /\.js$/,
       loader: 'babel-loader'
     },
     // this will apply to both plain `.css` files
     // AND `<style>` blocks in `.vue` files
     {
       test: /\.css$/,
       use: [
         'vue-style-loader',
         'css-loader'
       ]
      },
      {
       test: /\.scss$/,
       use: [
         'vue-style-loader',
         'css-loader',
         'sass-loader'
       ]
      },
     ],
 },
 plugins: [
  new VueLoaderPlugin(),
  new HtmlWebpackPlugin({
   template: './src/index.html'
  })
 ]
};