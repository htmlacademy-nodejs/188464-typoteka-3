'use strict';

const {Router} = require(`express`);
const {page} = require(`../utils`);

const articlesRouter = new Router();
articlesRouter.get(`/category/:id`, page);
articlesRouter.get(`/add`, page);
articlesRouter.get(`/edit/:id`, page);
articlesRouter.get(`/:id`, page);

module.exports = {articlesRouter};
