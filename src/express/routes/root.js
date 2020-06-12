'use strict';
const {Router} = require(`express`);
const {page} = require(`../utils`);

const {authRouter} = require(`./auth`);
const {articlesRouter} = require(`./articles`);
const {personalRouter} = require(`./personal`);
const {searchRouter} = require(`./search`);

const rootRouter = new Router();

rootRouter.get(`/`, page);
rootRouter.use(`/search`, searchRouter);
rootRouter.use(`/articles`, articlesRouter);
rootRouter.use(`/my`, personalRouter);
rootRouter.use(`/`, authRouter);

module.exports = {rootRouter};
