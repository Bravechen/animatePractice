const dev = {
  mode: 'development',
  context: '/Users/Brave/workplace/projectWP/jiaoping-fe',
  devtool: 'cheap-module-eval-source-map',
  node: {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  output: {
    path: '/Users/Brave/workplace/projectWP/jiaoping-fe/dist',
    filename: '[name].js',
    publicPath: '/',
    globalObject: '(typeof self !== \'undefined\' ? self : this)'
  },
  resolve: {
    alias: {
      '@': '/Users/Brave/workplace/projectWP/jiaoping-fe/src',
      vue$: 'vue/dist/vue.runtime.esm.js'
    },
    extensions: [
      '.mjs',
      '.js',
      '.jsx',
      '.vue',
      '.json',
      '.wasm'
    ],
    modules: [
      'node_modules',
      '/Users/Brave/workplace/projectWP/jiaoping-fe/node_modules',
      '/Users/Brave/workplace/projectWP/jiaoping-fe/node_modules/@vue/cli-service/node_modules'
    ]
  },
  resolveLoader: {
    modules: [
      '/Users/Brave/workplace/projectWP/jiaoping-fe/node_modules/@vue/cli-plugin-eslint/node_modules',
      '/Users/Brave/workplace/projectWP/jiaoping-fe/node_modules/@vue/cli-plugin-babel/node_modules',
      'node_modules',
      '/Users/Brave/workplace/projectWP/jiaoping-fe/node_modules',
      '/Users/Brave/workplace/projectWP/jiaoping-fe/node_modules/@vue/cli-service/node_modules'
    ]
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      /* config.module.rule('vue') */
      {
        test: /\.vue$/,
        use: [
          /* config.module.rule('vue').use('cache-loader') */
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: '/Users/Brave/workplace/projectWP/jiaoping-fe/node_modules/.cache/vue-loader',
              cacheIdentifier: '7ecdeba1'
            }
          },
          /* config.module.rule('vue').use('vue-loader') */
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              },
              cacheDirectory: '/Users/Brave/workplace/projectWP/jiaoping-fe/node_modules/.cache/vue-loader',
              cacheIdentifier: '7ecdeba1'
            }
          }
        ]
      },
      /* config.module.rule('images') */
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
          /* config.module.rule('images').use('url-loader') */
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'static/pc/img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('svg') */
      {
        test: /\.(svg)(\?.*)?$/,
        use: [
          /* config.module.rule('svg').use('file-loader') */
          {
            loader: 'file-loader',
            options: {
              name: 'static/pc/img/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      /* config.module.rule('media') */
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          /* config.module.rule('media').use('url-loader') */
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'static/pc/media/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('fonts') */
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          /* config.module.rule('fonts').use('url-loader') */
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'static/pc/fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('pug') */
      {
        test: /\.pug$/,
        oneOf: [
          /* config.module.rule('pug').oneOf('pug-vue') */
          {
            resourceQuery: /vue/,
            use: [
              /* config.module.rule('pug').oneOf('pug-vue').use('pug-plain-loader') */
              {
                loader: 'pug-plain-loader'
              }
            ]
          },
          /* config.module.rule('pug').oneOf('pug-template') */
          {
            use: [
              /* config.module.rule('pug').oneOf('pug-template').use('raw') */
              {
                loader: 'raw-loader'
              },
              /* config.module.rule('pug').oneOf('pug-template').use('pug-plain') */
              {
                loader: 'pug-plain-loader'
              }
            ]
          }
        ]
      },
      /* config.module.rule('css') */
      {
        test: /\.css$/,
        oneOf: [
          /* config.module.rule('css').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('css').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('css').oneOf('vue-modules').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              /* config.module.rule('css').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('css').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.modul
e.rule('css').oneOf('vue').use('vue-style-loader') */
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('css').oneOf('vue').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('css').oneOf('vue').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('css').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('css').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('css').oneOf('normal-modules').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              /* config.module.rule('css').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('css').oneOf('normal') */
          {
            use: [
              /* config.module.rule('css').oneOf('normal').use('vue-style-loader') */
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('css').oneOf('normal').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('css').oneOf('normal').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('postcss') */
      {
        test: /\.p(ost)?css$/,
        oneOf: [
          /* config.module.rule('postcss').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('postcss').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('postcss').oneOf('vue-modules').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              /* config.module.rule('postcss').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('postcss').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('postcss').oneOf('vue').use('vue-style-loader') */
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('postcss').oneOf('vue').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('postcss').oneOf('vue').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('postcss').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('postcss').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('postcss').oneOf('normal-modules').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              /* config.module.rule('postcss').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('postcss').oneOf('normal') */
          {
            use: [
              /* config.module.rule('postcss').oneOf('normal').use('vue-style-loader') */
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('postcss').oneOf('normal').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('postcss').oneOf('normal').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('scss') */
      {
        test: /\.scss$/,
        oneOf: [
          /* config.module.rule('scss').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('scss').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('scss').oneOf('vue-modules').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              /* config.module.rule('scss').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('scss').oneOf('vue-modules').use('sass-loader') */
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('scss').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('scss').oneOf('vue').use('vue-style-loader') */
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('scss').oneOf('vue').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('scss').oneOf('vue').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('scss').oneOf('vue').use('sass-loader') */
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('scss').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('scss').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('scss').oneOf('normal-modules').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              /* config.module.rule('scss').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('scss').oneOf('normal-modules').use('sass-loader') */
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('scss').oneOf('normal') */
          {
            use: [
              /* config.module.rule('scss').oneOf('normal').use('vue-style-loader') */
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('scss').oneOf('normal').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('scss').oneOf('normal').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('scss').oneOf('normal').use('sass-loader') */
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('sass') */
      {
        test: /\.sass$/,
        oneOf: [
          /* config.module.rule('sass').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('sass').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('sass').oneOf('vue-modules').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              /* config.module.rule('sass').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('sass').oneOf('vue-modules').use('sass-loader') */
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false,
                  indentedSyntax: true
                }
              }
            ]
          },
          /* config.module.rule('sass').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('sass').oneOf('vue').use('vue-style-loader') */
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('sass').oneOf('vue').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('sass').oneOf('vue').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('sass').oneOf('vue').use('sass-loader') */
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false,
                  indentedSyntax: true
                }
              }
            ]
          },
          /* config.module.rule('sass').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('sass').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('sass').oneOf('normal-modules').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              /* config.module.rule('sass').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('sass').oneOf('normal-modules').use('sass-loader') */
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false,
                  indentedSyntax: true
                }
              }
            ]
          },
          /* config.module.rule('sass').oneOf('normal') */
          {
            use: [
              /* config.module.rule('sass').oneOf('normal').use('vue-style-loader') */
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('sass').oneOf('normal').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('sass').oneOf('normal').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('sass').oneOf('normal').use('sass-loader') */
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false,
                  indentedSyntax: true
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('less') */
      {
        test: /\.less$/,
        oneOf: [
          /* config.module.rule('less').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('less').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('less').oneOf('vue-modules').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              /* config.module.rule('less').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('less').oneOf('vue-modules').use('less-loader') */
              {
                loader: 'less-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('less').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('less').oneOf('vue').use('vue-style-loader') */
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('less').oneOf('vue').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('less').oneOf('vue').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('less').oneOf('vue').use('less-loader') */
              {
                loader: 'less-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('less').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('less').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('less').oneOf('normal-modules').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              /* config.module.rule('less').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('less').oneOf('normal-modules').use('less-loader') */
              {
                loader: 'less-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('less').oneOf('normal') */
          {
            use: [
              /* config.module.rule('less').oneOf('normal').use('vue-style-loader') */
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('less').oneOf('normal').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('less').oneOf('normal').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('less').oneOf('normal').use('less-loader') */
              {
                loader: 'less-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('stylus') */
      {
        test: /\.styl(us)?$/,
        oneOf: [
          /* config.module.rule('stylus').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('stylus').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('stylus').oneOf('vue-modules').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              /* config.module.rule('stylus').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('stylus').oneOf('vue-modules').use('stylus-loader') */
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('stylus').oneOf('vue').use('vue-style-loader') */
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('stylus').oneOf('vue').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('stylus').oneOf('vue').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('stylus').oneOf('vue').use('stylus-loader') */
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('stylus').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('stylus').oneOf('normal-modules').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              /* config.module.rule('stylus').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('stylus').oneOf('normal-modules').use('stylus-loader') */
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').oneOf('normal') */
          {
            use: [
              /* config.module.rule('stylus').oneOf('normal').use('vue-style-loader') */
              {
                loader: 'vue-style-loader',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('stylus').oneOf('normal').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('stylus').oneOf('normal').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('stylus').oneOf('normal').use('stylus-loader') */
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('js') */
      {
        test: /\.m?jsx?$/,
        exclude: [
          function () {
            /* omitted long function */ },
          '/gulpfile.js',
          '/jp.build.js',
          '/env.config.js',
          '/gulp_build/',
          /workers/
        ],
        use: [
          /* config.module.rule('js').use('cache-loader') */
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: '/Users/Brave/workplace/projectWP/jiaoping-fe/node_modules/.cache/babel-loader',
              cacheIdentifier: '778c848d'
            }
          },
          /* config.module.rule('js').use('babel-loader') */
          {
            loader: 'babel-loader'
          }
        ]
      },
      /* config.module.rule('eslint') */
      {
        enforce: 'pre',
        test: /\.(vue|(j|t)sx?)$/,
        exclude: [
          /node_modules/,
          '/Users/Brave/workplace/projectWP/jiaoping-fe/node_modules/@vue/cli-service/lib',
          '/gulpfile.js',
          '/jp.build.js',
          '/env.config.js',
          '/gulp_build/'
        ],
        use: [
          /* config.module.rule('eslint').use('eslint-loader') */
          {
            loader: 'eslint-loader',
            options: {
              extensions: [
                '.js',
                '.jsx',
                '.vue'
              ],
              cache: true,
              cacheIdentifier: 'af5a8930',
              emitWarning: true,
              emitError: false,
              eslintPath: '/Users/Brave/workplace/projectWP/jiaoping-fe/node_modules/eslint',
              formatter: function () {
                /* omitted long function */ }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    /* config.plugin('vue-loader') */
    new VueLoaderPlugin(),
    /* config.plugin('define') */
    new DefinePlugin({
      'process.env': {
        VUE_APP_CLI_UI_URL: '""',
        NODE_ENV: '"development"',
        BASE_URL: '"/"'
      }
    }),
    /* config.plugin('case-sensitive-paths') */
    new CaseSensitivePathsPlugin(),
    /* config.plugin('friendly-errors') */
    new FriendlyErrorsWebpackPlugin({
      additionalTransformers: [
        function () {
          /* omitted long function */ }
      ],
      additionalFormatters: [
        function () {
          /* omitted long function */ }
      ]
    }),
    /* config.plugin('hmr') */
    new HotModuleReplacementPlugin(),
    /* config.plugin('progress') */
    new ProgressPlugin(),
    /* config.plugin('html-home') */
    new HtmlWebpackPlugin({
      templateParameters: function () {
        /* omitted long function */ },
      chunks: [
        'chunk-vendors',
        'chunk-common',
        'home'
      ],
      template: 'public/index.html',
      filename: 'index.html'
    }),
    /* config.plugin('html-appdetail') */
    new HtmlWebpackPlugin({
      templateParameters: function () {
        /* omitted long function */ },
      chunks: [
        'chunk-vendors',
        'chunk-common',
        'appdetail'
      ],
      template: 'public/appdetail.html',
      filename: 'appdetail.html'
    }),
    /* config.plugin('html-appranking') */
    new HtmlWebpackPlugin({
      templateParameters: function () {
        /* omitted long function */ },
      chunks: [
        'chunk-vendors',
        'chunk-common',
        'appranking'
      ],
      template: 'public/appranking.html',
      filename: 'appranking.html'
    }),
    /* config.plugin('html-remarkdetail') */
    new HtmlWebpackPlugin({
      templateParameters: function () {
        /* omitted long function */ },
      chunks: [
        'chunk-vendors',
        'chunk-common',
        'remarkdetail'
      ],
      template: 'public/remarkdetail.html',
      filename: 'remarkdetail.html'
    }),
    /* config.plugin('html-counselorlist') */
    new HtmlWebpackPlugin({
      templateParameters: function () {
        /* omitted long function */ },
      chunks: [
        'chunk-vendors',
        'chunk-common',
        'counselorlist'
      ],
      template: 'public/counselorlist.html',
      filename: 'counselorlist.html'
    }),
    /* config.plugin('html-evaluationlist') */
    new HtmlWebpackPlugin({
      templateParameters: function () {
        /* omitted long function */ },
      chunks: [
        'chunk-vendors',
        'chunk-common',
        'evaluationlist'
      ],
      template: 'public/evaluationlist.html',
      filename: 'evaluationlist.html'
    }),
    /* config.plugin('html-evalart') */
    new HtmlWebpackPlugin({
      templateParameters: function () {
        /* omitted long function */ },
      chunks: [
        'chunk-vendors',
        'chunk-common',
        'evalart'
      ],
      template: 'public/evalart.html',
      filename: 'evalart.html'
    }),
    /* config.plugin('html-appevals') */
    new HtmlWebpackPlugin({
      templateParameters: function () {
        /* omitted long function */ },
      chunks: [
        'chunk-vendors',
        'chunk-common',
        'appevals'
      ],
      template: 'public/appevals.html',
      filename: 'appevals.html'
    }),
    /* config.plugin('html-remarklist') */
    new HtmlWebpackPlugin({
      templateParameters: function () {
        /* omitted long function */ },
      chunks: [
        'chunk-vendors',
        'chunk-common',
        'remarklist'
      ],
      template: 'public/remarklist.html',
      filename: 'remarklist.html'
    }),
    /* config.plugin('preload-home') */
    new PreloadPlugin({
      rel: 'preload',
      includeHtmlNames: [
        'index.html'
      ],
      include: {
        type: 'initial',
        entries: [
          'home'
        ]
      },
      fileBlacklist: [
        /\.map$/,
        /hot-update\.js$/
      ]
    }),
    /* config.plugin('prefetch-home') */
    new PreloadPlugin({
      rel: 'prefetch',
      includeHtmlNames: [
        'index.html'
      ],
      include: {
        type: 'asyncChunks',
        entries: [
          'home'
        ]
      }
    }),
    /* config.plugin('preload-appdetail') */
    new PreloadPlugin({
      rel: 'preload',
      includeHtmlNames: [
        'appdetail.html'
      ],
      include: {
        type: 'initial',
        entries: [
          'appdetail'
        ]
      },
      fileBlacklist: [
        /\.map$/,
        /hot-update\.js$/
      ]
    }),
    /* config.plugin('prefetch-appdetail') */
    new PreloadPlugin({
      rel: 'prefetch',
      includeHtmlNames: [
        'appdetail.html'
      ],
      include: {
        type: 'asyncChunks',
        entries: [
          'appdetail'
        ]
      }
    }),
    /* config.plugin('preload-appranking') */
    new PreloadPlugin({
      rel: 'preload',
      includeHtmlNames: [
        'appranking.html'
      ],
      include: {
        type: 'initial',
        entries: [
          'appranking'
        ]
      },
      fileBlacklist: [
        /\.map$/,
        /hot-update\.js$/
      ]
    }),
    /* config.plugin('prefetch-appranking') */
    new PreloadPlugin({
      rel: 'prefetch',
      includeHtmlNames: [
        'appranking.html'
      ],
      include: {
        type: 'asyncChunks',
        entries: [
          'appranking'
        ]
      }
    }),
    /* config.plugin('preload-remarkdetail') */
    new PreloadPlugin({
      rel: 'preload',
      includeHtmlNames: [
        'remarkdetail.html'
      ],
      include: {
        type: 'initial',
        entries: [
          'remarkdetail'
        ]
      },
      fileBlacklist: [
        /\.map$/,
        /hot-update\.js$/
      ]
    }),
    /* config.plugin('prefetch-remarkdetail') */
    new PreloadPlugin({
      rel: 'prefetch',
      includeHtmlNames: [
        'remarkdetail.html'
      ],
      include: {
        type: 'asyncChunks',
        entries: [
          'remarkdetail'
        ]
      }
    }),
    /* config.plugin('preload-counselorlist') */
    new PreloadPlugin({
      rel: 'preload',
      includeHtmlNames: [
        'counselorlist.html'
      ],
      include: {
        type: 'initial',
        entries: [
          'counselorlist'
        ]
      },
      fileBlacklist: [
        /\.map$/,
        /hot-update\.js$/
      ]
    }),
    /* config.plugin('prefetch-counselorlist') */
    new PreloadPlugin({
      rel: 'prefetch',
      includeHtmlNames: [
        'counselorlist.html'
      ],
      include: {
        type: 'asyncChunks',
        entries: [
          'counselorlist'
        ]
      }
    }),
    /* config.plugin('preload-evaluationlist') */
    new PreloadPlugin({
      rel: 'preload',
      includeHtmlNames: [
        'evaluationlist.html'
      ],
      include: {
        type: 'initial',
        entries: [
          'evaluationlist'
        ]
      },
      fileBlacklist: [
        /\.map$/,
        /hot-update\.js$/
      ]
    }),
    /* config.plugin('prefetch-evaluationlist') */
    new PreloadPlugin({
      rel: 'prefetch',
      includeHtmlNames: [
        'evaluationlist.html'
      ],
      include: {
        type: 'asyncChunks',
        entries: [
          'evaluationlist'
        ]
      }
    }),
    /* config.plugin('preload-evalart') */
    new PreloadPlugin({
      rel: 'preload',
      includeHtmlNames: [
        'evalart.html'
      ],
      include: {
        type: 'initial',
        entries: [
          'evalart'
        ]
      },
      fileBlacklist: [
        /\.map$/,
        /hot-update\.js$/
      ]
    }),
    /* config.plugin('prefetch-evalart') */
    new PreloadPlugin({
      rel: 'prefetch',
      includeHtmlNames: [
        'evalart.html'
      ],
      include: {
        type: 'asyncChunks',
        entries: [
          'evalart'
        ]
      }
    }),
    /* config.plugin('preload-appevals') */
    new PreloadPlugin({
      rel: 'preload',
      includeHtmlNames: [
        'appevals.html'
      ],
      include: {
        type: 'initial',
        entries: [
          'appevals'
        ]
      },
      fileBlacklist: [
        /\.map$/,
        /hot-update\.js$/
      ]
    }),
    /* config.plugin('prefetch-appevals') */
    new PreloadPlugin({
      rel: 'prefetch',
      includeHtmlNames: [
        'appevals.html'
      ],
      include: {
        type: 'asyncChunks',
        entries: [
          'appevals'
        ]
      }
    }),
    /* config.plugin('preload-remarklist') */
    new PreloadPlugin({
      rel: 'preload',
      includeHtmlNames: [
        'remarklist.html'
      ],
      include: {
        type: 'initial',
        entries: [
          'remarklist'
        ]
      },
      fileBlacklist: [
        /\.map$/,
        /hot-update\.js$/
      ]
    }),
    /* config.plugin('prefetch-remarklist') */
    new PreloadPlugin({
      rel: 'prefetch',
      includeHtmlNames: [
        'remarklist.html'
      ],
      include: {
        type: 'asyncChunks',
        entries: [
          'remarklist'
        ]
      }
    }),
    /* config.plugin('copy') */
    new CopyWebpackPlugin(
      [{
        from: '/Users/Brave/workplace/projectWP/jiaoping-fe/public',
        to: '/Users/Brave/workplace/projectWP/jiaoping-fe/dist',
        toType: 'dir',
        ignore: [
          '.DS_Store',
          'public/index.html',
          'public/appdetail.html',
          'public/appranking.html',
          'public/remarkdetail.html',
          'public/counselorlist.html',
          'public/evaluationlist.html',
          'public/evalart.html',
          'public/appevals.html',
          'public/remarklist.html'
        ]
      }]
    )
  ],
  entry: {
    home: [
      '/Users/Brave/workplace/projectWP/jiaoping-fe/src/pages/home/main.js'
    ],
    appdetail: [
      '/Users/Brave/workplace/projectWP/jiaoping-fe/src/pages/appdetail/main.js'
    ],
    appranking: [
      '/Users/Brave/workplace/projectWP/jiaoping-fe/src/pages/appranking/main.js'
    ],
    remarkdetail: [
      '/Users/Brave/workplace/projectWP/jiaoping-fe/src/pages/remarkdetail/main.js'
    ],
    counselorlist: [
      '/Users/Brave/workplace/projectWP/jiaoping-fe/src/pages/counselorlist/main.js'
    ],
    evaluationlist: [
      '/Users/Brave/workplace/projectWP/jiaoping-fe/src/pages/evaluationlist/main.js'
    ],
    evalart: [
      '/Users/Brave/workplace/projectWP/jiaoping-fe/src/pages/evalart/main.js'
    ],
    appevals: [
      '/Users/Brave/workplace/projectWP/jiaoping-fe/src/pages/appevals/main.js'
    ],
    remarklist: [
      '/Users/Brave/workplace/projectWP/jiaoping-fe/src/pages/remarklist/main.js'
    ]
  }
}
