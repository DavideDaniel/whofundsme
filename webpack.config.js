const path = require('path');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const convert = require('koa-connect');
const proxy = require('http-proxy-middleware');
const historyApiFallback = require('koa2-connect-history-api-fallback');
const env = require('dotenv').config();

const { NODE_ENV = 'development', API_PATH, LOG_GRAPHQL_FETCH_ERRORS } = env.parsed;

const babelLoader = require.resolve('babel-loader');
const prod = 'production';
const isProd = NODE_ENV === prod;
const mode = isProd ? prod : 'development';
const appRoot = path.resolve(__dirname);
const content = path.resolve(appRoot, 'public/resources');
const removeEmpty = arr => arr.filter(item => !!item);
const inDevOnly = plugin => !isProd && plugin;

const prodConfig = {
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyWebpackPlugin({
        uglifyOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            booleans: true,
            comparisons: false,
            conditionals: true,
            dead_code: true,
            drop_console: true,
            drop_debugger: true,
            evaluate: true,
            hoist_funs: true,
            if_return: true,
            join_vars: true,
            loops: true,
            negate_iife: true,
            properties: true,
            ie8: false,
            sequences: true,
            unused: true,
            warnings: false,
          },
          mangle: {
            safari10: true,
            ie8: false,
            reserved: ['exports', 'require'],
          },
          output: {
            ecma: 5,
            ie8: false,
            comments: false,
            ascii_only: true,
          },
        },
        parallel: true,
        cache: true,
        // TODO MYBAG-0000 should make configurable source maps
        sourceMap: false,
      }),
    ],
    nodeEnv: 'production',
    sideEffects: true,
    concatenateModules: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial',
        },
      },
    },
    runtimeChunk: {
      name: 'manifest',
    },
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};
const pack = () => {
  const config = {
    mode,
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'public', 'resources'),
      filename: '[name].[hash:6].js',
      chunkFilename: '[name].[hash:6].chunk.js',
    },
    plugins: removeEmpty([
      new CleanWebpackPlugin(['public/resources']),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
        'process.env.API_PATH': JSON.stringify(API_PATH),
        'process.env.LOG_GRAPHQL_FETCH_ERRORS': JSON.stringify(LOG_GRAPHQL_FETCH_ERRORS),
      }),
      new HtmlWebpackPlugin({
        title: 'WhoFundsMe',
        filename: 'index.html',
        template: `./template.${mode}.html`,
        meta: { viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
      inDevOnly(new webpack.NamedModulesPlugin()),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: path.join(appRoot, 'reports', 'webpack', 'webpack.html'),
        statsFilename: path.join(appRoot, 'reports', 'webpack', 'stats.json'),
        openAnalyzer: false,
        generateStatsFile: true,
        logLevel: 'error',
      }),
    ]),

    serve: {
      // The path, or array of paths, from which static content will be served.
      // Default: process.cwd()
      // see https://github.com/webpack-contrib/webpack-serve#options
      content,
      add: app => {
        // SPA are usually served through index.html so when the user refresh from another
        // location say /about, the server will fail to GET anything from /about. We use
        // HTML5 History API to change the requested location to the index we specified
        app.use(historyApiFallback());
        app.use(
          convert(
            // Although we are using HTML History API to redirect any sub-directory requests to index.html,
            // the server is still requesting resources like JavaScript in relative paths,
            // for example http://localhost:8080/users/main.js, therefore we need proxy to
            // redirect all non-html sub-directory requests back to base path too
            proxy(
              // if pathname matches RegEx and is GET
              (pathname, req) => pathname.match('/.*/') && req.method === 'GET',
              {
                // options.target, required
                target: 'http://localhost:5000',
                pathRewrite: {
                  '^/.*/': '/', // rewrite back to base path
                },
              }
            )
          )
        );
      },
    },

    resolve: {
      symlinks: false,
    },

    externals: {
      React: 'react',
      ReactDOM: 'react-dom',
      Select: 'react-select',
    },

    module: {
      rules: [
        {
          test: /\.(graphql|gql)$/,
          loader: 'raw-loader',
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: babelLoader,
          options: {
            babelrc: false,
            cacheDirectory: false,
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    browsers: ['last 3 versions', 'IE >=10'],
                  },
                  modules: false,
                },
              ],
              '@babel/preset-react',
            ],
            plugins: [
              [
                'emotion',
                {
                  // sourceMap is on by default but source maps are dead code eliminated in production
                  sourceMap: true,
                  autoLabel: process.env.NODE_ENV !== 'production',
                  labelFormat: '[local]',
                  cssPropOptimization: true,
                },
              ],
            ],
          },
        },
        {
          test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)([?]?.*)$/,
          loader: 'url-loader?name=[name].[ext]"',
          exclude: /node_modules/,
          query: {
            limit: 10000,
            emitFile: true,
          },
        },
      ],
    },
  };

  if (isProd) {
    return {
      ...config,
      ...prodConfig,
    };
  }
  return config;
};

module.exports = pack();
