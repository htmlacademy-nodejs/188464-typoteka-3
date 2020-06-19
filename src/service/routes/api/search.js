'use strict';

const {Router} = require(`express`);
const {searchArticlesByTitle} = require(`../../mockUtils`);

const searchRouter = new Router();

searchRouter.get(`/`, async (req, res, next) => {
  try {
    res.json(await searchArticlesByTitle(req.query.query));
  } catch (err) {
    next(err);
  }
});

module.exports = {searchRouter};
