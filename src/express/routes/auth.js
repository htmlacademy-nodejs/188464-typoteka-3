'use strict';

const {Router} = require(`express`);
const {page} = require(`../utils`);

const authRouter = new Router();
authRouter.get(`/login`, page);
authRouter.get(`/register`, page);

module.exports = {authRouter};
