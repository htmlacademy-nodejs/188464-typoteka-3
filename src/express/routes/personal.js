'use strict';

const {Router} = require(`express`);

const personalRouter = new Router();
personalRouter.get(`/`, (req, res) => {
  res.render(`my`);
});
personalRouter.get(`/comments`, (req, res) => {
  res.render(`comments`);
});

module.exports = {personalRouter};
