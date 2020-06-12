'use strict';

const {Router} = require(`express`);
const {page} = require(`../utils`);

const loginRouter = new Router();
loginRouter.get(`/`, page);

module.exports = {loginRouter};
