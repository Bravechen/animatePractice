/**
 * @description 服务器设置
 * @author Brave Chan on 2019.11
 * @version 0.0.0
 */
//============================================================

import express from 'express';
import debug from 'debug';
import logger from 'morgan';
import path from 'path';

import { setMiddlewares } from './config/middlewares.js';
import { setViewEngine } from './config/viewEngine.js';
import { setRoutes, setStatic } from './routes/routes.js';
import { handleErrs } from './config/handleErr.js';

import serverConfig from '../server.config.js';
//============================================================

//============================================================
/**
 * @private
 * @description 创建服务器app
 * @param {*} param0
 */
function createApp({ express, appDebug }) {
  appDebug('create project app');
  return {
    app: express()
  };
}

//============================================================
export default [
  // 1. 创建应用
  createApp,
  // 2. 设置模板引擎
  setViewEngine,
  // 3. 设置中间件
  setMiddlewares,
  // 4. 设置静态文件目录和路由
  setStatic,
  // 5. 设置页面和服务路由
  setRoutes,
  // 6. 设置错误处理
  handleErrs
].reduce(
  function(prev, item) {
    return Object.assign({}, prev, item(prev) || {})
  },
  {
    app: null,
    express,
    appDebug: debug('app'),
    ...serverConfig
  }
).app;
