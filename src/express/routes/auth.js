'use strict';

const {Router} = require(`express`);

const authRouter = new Router();
authRouter.get(`/login`, (req, res) => {
  res.render(`login`);
});
authRouter.get(`/register`, (req, res) => {
  res.render(`sign-up`);
});

module.exports = {authRouter};
