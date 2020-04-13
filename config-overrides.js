const path = require('path');
function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = function override(config, env) {
  config.resolve.alias = {
    '@': resolve('src')
  };
  config.resolve.alias = {
    '@views': resolve('src/views')
  };
  config.resolve.alias = {
    '@assets': resolve('src/assets')
  };
  return config;
}
