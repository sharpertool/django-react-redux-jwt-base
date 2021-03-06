import webpack           from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpackConfig     from './_base';

webpackConfig.module.loaders = webpackConfig.module.loaders.map(loader => {
  if (/css/.test(loader.test)) {
    const [first, ...rest] = loader.loaders;

    loader.loader = ExtractTextPlugin.extract(first, rest.join('!'));
    delete loader.loaders;
  }

  return loader;
});

webpackConfig.plugins.push(
  new ExtractTextPlugin('[name].[contenthash].css'),
  new webpack.optimize.UglifyJsPlugin({
    compress : {
      'unused'    : true,
      'dead_code' : true
    }
  })
);

// add font-awesome-webpack to beginning of entry list
webpackConfig.entry.app.splice(0, 0, 'font-awesome-webpack!./src/static/styles/font-awesome.config.prod.js');
// add boostrap-loader to vendor
webpackConfig.entry.vendor.splice(0, 0, 'bootstrap-loader/extractStyles');

export default webpackConfig;
