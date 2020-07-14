/**
 * @description 错误管理
 * @author Brave Chan on 2019.11
 * @version 0.0.0
 */
//============================================================
import createError from 'http-errors';
//============================================================
// 错误页面模板地址
const errTemplate = {
  [404]: './pages/errors/err4x',
  [500]: './pages/errors/err5x',
  default: './pages/errors/error'
};

// catch 404 and forward to error handler
function err404(req, res, next) {
  next(createError(404));
}

// error handler
function errDefault(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  let errStatus = err.status || 500;
  res.status(errStatus);
  res.render(errTemplate[errStatus] || errTemplate.default, { layout: './layouts/errLayout', errData: err });
}

/**
 * @internal
 * @description 处理错误
 * @param {*} param0
 */
export function handleErrs({ app, appDebug }) {
  // catch 404 and forward to error handler
  app.use(err404);

  // error handler
  app.use(errDefault);
  appDebug('set error handler');
  return {};
}
//============================================================
export default {
  handleErrs
};
