'use strict';

const {Router} = require(`express`);
const {page} = require(`../utils`);

const articlesRouter = new Router();
articlesRouter.get(`/category/:id`, (req, res) => {
  res.render(`articles-by-category`);
});
articlesRouter.get(`/add`, (req, res) => {
  res.render(`new-post`);
});
articlesRouter.get(`/edit/:id`, page);
articlesRouter.get(`/:id`, (req, res) => {
  res.render(`post`);
});

module.exports = {articlesRouter};
