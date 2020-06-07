'use strict';
const {Router} = require(`express`);

const page = (req, res) => {
  res.send(req.baseUrl + req.route.path);
};

const articlesRouter = new Router();
articlesRouter.get(`/category/:id`, page);
articlesRouter.get(`/add`, page);
articlesRouter.get(`/edit/:id`, page);
articlesRouter.get(`/:id`, page);

const myRouter = new Router();
myRouter.get(`/`, page);
myRouter.get(`/comments`, page);

const rootRouter = new Router();
rootRouter.get(`/`, page);

rootRouter.get(`/register`, page);
rootRouter.get(`/login`, page);
rootRouter.get(`/search`, page);
rootRouter.use(`/articles`, articlesRouter);
rootRouter.use(`/my`, myRouter);

module.exports = {rootRouter};
