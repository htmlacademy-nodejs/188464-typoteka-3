'use strict';

const {Router} = require(`express`);
const {page} = require(`../utils`);

const personalRouter = new Router();
personalRouter.get(`/`, page);
personalRouter.get(`/comments`, page);

module.exports = {personalRouter};
