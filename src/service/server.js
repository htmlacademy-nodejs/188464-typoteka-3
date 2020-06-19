'use strict';

const express = require(`express`);
const {apiRouter} = require(`./routes/api`);
const {postsRouter} = require(`./routes/posts`);
const HttpStatus = require(`http-status-codes`);
const {Errors} = require(`./mockUtils`);

const DEFAULT_PORT = 3000;


const app = express();
app.use(express.json());
app.use(`/posts`, postsRouter);
app.use(`/api`, apiRouter);

app.use(function (err, req, res, next) {
  if (err) {
    console.error(err.message);
    switch (err.message) {
      case Errors.MOCK_PARAMS_ERROR:
        res.status(HttpStatus.BAD_REQUEST);
        break;
      case Errors.ARTICLE_NOT_FOUND:
        res.status(HttpStatus.NOT_FOUND);
        break;
      default:
        res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    res.send(``);
  }
  next();
});

exports.start = (port) => {
  port = Number.isNaN(port) ? DEFAULT_PORT : port;
  app.listen(port, () => console.info(`listening on ${port}.`));
};
