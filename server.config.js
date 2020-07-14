import path from 'path';
import hbsSettings from './plugins/hbsSetting.js';

export default {
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

