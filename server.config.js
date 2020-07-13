const path = require('path');
const hbsSettings = require('./plugins/hbsSetting');

const serverConfig = {
  port: process.env.PORT || '3000',
  viewsDir: path.join(process.cwd(), './web/views'),
  staticDirs: [{ route: '/static', dir: path.join(process.cwd(), './web/static') }],
  viewEngine: {
    engine: 'hbs',
    defaultLayout: './layouts/layout',
    partials: [
      path.join(process.cwd(), './web/views/components'), 
      path.join(process.cwd(), './web/views/templates')
    ],
    settings: [hbsSettings]
  }
};

module.exports = serverConfig;