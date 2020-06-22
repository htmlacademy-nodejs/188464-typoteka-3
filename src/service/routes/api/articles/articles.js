'use strict';

const {Router} = require(`express`);
const HttpStatus = require(`http-status-codes`);
const {getArticlesShort, getArticleById, addArticle, editArticle, deleteArticleById} = require(`../../../mock-utils`);

const articlesRouter = new Router();

articlesRouter.get(`/`, async (req, res, next) => {
  try {
    res.json(await getArticlesShort());
  } catch (err) {
    next(err);
  }

});
articlesRouter.post(`/`, async (req, res, next) => {
  try {
    const id = await addArticle(req.body);
    res.status(HttpStatus.CREATED);
    res.json({id});
  } catch (err) {
    next(err);
  }
});


articlesRouter.get(`/:articleId`, async (req, res, next) => {
  try {
    res.json(await getArticleById(req.params.articleId));
  } catch (err) {
    next(err);
  }

});

articlesRouter.put(`/:articleId`, async (req, res, next) => {
  try {
    await editArticle(req.params.articleId, req.body);
    res.status(HttpStatus.NO_CONTENT);
    res.send(``);
  } catch (err) {
    next(err);
  }
});

articlesRouter.delete(`/:articleId`, async (req, res, next) => {
  try {
    await deleteArticleById(req.params.articleId);
    res.status(HttpStatus.NO_CONTENT);
    res.send(``);
  } catch (err) {
    next(err);
  }
});

articlesRouter.use(`/:articleId/(*+)`, (req, res, next) => {
  req.parentParams = {articleId: req.params.articleId};
  next();
});


module.exports = {articlesRouter};
