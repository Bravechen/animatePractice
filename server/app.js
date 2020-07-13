const express = require('express');
const debug = require('debug');
const logger = require('morgan');
const path = require('path');

const { setMiddlewares } = require('./config/middlewares.js');
const { setViewEngine } = require('./config/viewEngine.js');
const { setRoutes, setStatic } = require('./routes/routes');
const { handleErrs } = require('./config/handleErrs');
//============================================================
function createApp({ express, appDebug }) {
    appDebug('create project app');
    return {
      app: express()
    };
  }

  