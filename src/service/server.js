'use strict';
const express = require(`express`);
const fsPromises = require(`fs`).promises;
const {MOCK_PATH} = require(`./constants`);

const DEFAULT_PORT = 3000;

const postsRouter = new express.Router();
postsRouter.get(`/`, async (req, res) => {
  let mocks;
  try {
    mocks = await fsPromises.readFile(MOCK_PATH, {encoding: `utf-8`}).then((data) => JSON.parse(data));
  } catch (err) {
    res.json([]);
    return;
  }
  res.json(mocks);
})

const app = express();
app.use(express.json());
app.use(`/posts`, postsRouter);

exports.start = (port) => {
  port = Number.isNaN(port) ? DEFAULT_PORT : port;
  app.listen(port, () => console.info(`listening on ${port}.`));
};
