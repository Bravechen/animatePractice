/**
 * @description 路由配置
 * @author Brave Chan on 2019.11
 * @version 0.0.0
 */
//============================================================
import indexRouter from './index.js';

//============================================================
/**
 * @internal
 * @description 设置路由
 * @param {*} param0
 */
export function setRoutes({ app, appDebug }) {
  // 控制台
  app.use('/', indexRouter);

  appDebug('set routers');
  return {};
}

/**
 * @internal
 * @description 设置静态目录和路由
 * @param {*} param0
 */
export function setStatic({ app, express, appDebug, staticDirs }) {

  let list = staticDirs.map(function(item, index) {
    // default static
    if (typeof item === 'string') {
      app.use(express.static(item));
      return item;
    }

    if (typeof item === 'object' && item !== null && !!item.route) {
      app.use(item.route, express.static(item.dir));
      return item.route;
    }
    return false;
  });
  appDebug('set server static route and dir', list);
  return {};
}
//============================================================
export default { setRoutes, setStatic };
