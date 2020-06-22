'use strict';

const {Router} = require(`express`);
const HttpStatus = require(`http-status-codes`);
const {getCommentsByArticleId, addCommentToArticle, deleteCommentById} = require(`../../../mock-utils`);

const commentsRouter = new Router();

commentsRouter.get(`/`, async (req, res, next) => {
  try {
    res.json(await getCommentsByArticleId(req.parentParams.articleId));
  } catch (err) {
    next(err);
  }
});

commentsRouter.post(`/`, async (req, res, next) => {
  try {
    const id = await addCommentToArticle(req.parentParams.articleId, req.body);
    res.status(HttpStatus.CREATED);
    res.json({id});
  } catch (err) {
    next(err);
  }
});


commentsRouter.delete(`/:commentId`, async (req, res, next) => {
  try {
    await deleteCommentById(req.parentParams.articleId, req.params.commentId);
    res.status(HttpStatus.NO_CONTENT);
    res.send(``);
  } catch (err) {
    next(err);
  }
});

module.exports = {commentsRouter};
