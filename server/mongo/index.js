(function routes() {
  'use strict';

  module.exports = {
    user: {
      create:  require('./users/create'),
      findOne: require('./users/findOne'),
      update:  require('./users/update')
    }
  };
})();