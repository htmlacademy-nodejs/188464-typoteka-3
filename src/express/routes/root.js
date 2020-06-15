'use strict';
const {Router} = require(`express`);
const {authRouter} = require(`./auth`);
const {articlesRouter} = require(`./articles`);
const {personalRouter} = require(`./personal`);
const {searchRouter} = require(`./search`);

const rootRouter = new Router();
rootRouter.get(`/`, (req, res) => {
  res.render(`main`);
});
rootRouter.use(`/`, authRouter);
rootRouter.use(`/search`, searchRouter);
rootRouter.use(`/articles`, articlesRouter);
rootRouter.use(`/my`, personalRouter);

module.exports = {rootRouter};
