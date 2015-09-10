var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
  development:{
    db: 'mongodb://localhost/guid',
    rootPath: rootPath,
    port: process.env.PORT || 3030
  },
  production:{
    db: 'url',
    rootPath: rootPath,
    port: process.env.PORT || 80

  }


}