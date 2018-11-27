const path = require('path');
const convert = require('koa-connect');
const proxy = require('http-proxy-middleware');
const historyApiFallback = require('koa2-connect-history-api-fallback');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config');

const content = path.resolve(__dirname, 'public/resources');
const app = express();
const compiler = webpack(config);

const serve = {
  // The path, or array of paths, from which static content will be served.
  // Default: process.cwd()
  // see https://github.com/webpack-contrib/webpack-serve#options
  content,
  add: (app, middleware, options) => {
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
};
// app.use(
//   require('webpack-dev-middleware')(compiler, {
//     noInfo: true,
//     publicPath: config.output.publicPath,
//   })
// );

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/resources/index.html'));
});

app.listen(5000, 'localhost', err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:5000');
});
