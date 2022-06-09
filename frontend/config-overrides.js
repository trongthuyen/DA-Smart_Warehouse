
rewireProvidePlugin = require('react-app-rewire-provide-plugin');
module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config = rewireProvidePlugin(config, env, {
    'Buffer': 'buffer',
  })
  return config;
}