'use strict';

const {articlesRouter} = require(`./articles`);
const {commentsRouter} = require(`./comments`);

articlesRouter.use(`/:articleId/comments`, commentsRouter);

module.exports = {articlesRouter};
