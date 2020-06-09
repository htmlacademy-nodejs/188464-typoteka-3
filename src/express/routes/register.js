'use strict';

const {Router} = require(`express`);
const {page} = require(`../utils`);

const registerRouter = new Router();
registerRouter.get(`/`, page);

module.exports = {registerRouter};
