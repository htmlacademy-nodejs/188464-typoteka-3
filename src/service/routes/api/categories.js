'use strict';

const {Router} = require(`express`);
const {getCategories} = require(`../../mock-utils`);

const categoriesRouter = new Router();

categoriesRouter.get(`/`, async (req, res, next) => {
  try {
    res.json(await getCategories());
  } catch (err) {
    next(err);
  }
});

module.exports = {categoriesRouter};
