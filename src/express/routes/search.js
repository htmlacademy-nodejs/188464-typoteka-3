'use strict';

const {Router} = require(`express`);
const {page} = require(`../utils`);

const searchRouter = new Router();
searchRouter.get(`/`, page);

module.exports = {searchRouter};
