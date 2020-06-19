'use strict';

const {Router} = require(`express`);
const {getArticles} = require(`../mockUtils`);
const postsRouter = new Router();
postsRouter.get(`/`, async (req, res, next) => {
  try {
    res.json(await getArticles());
  } catch (err) {
    next(err);
  }
});

module.exports = {postsRouter};
