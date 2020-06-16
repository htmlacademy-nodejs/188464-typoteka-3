'use strict';

const fsPromises = require(`fs`).promises;
const path = require(`path`);
const chalk = require(`chalk`);
const format = require(`date-fns/format`);
const {nanoid} = require(`nanoid`);
const {shuffle, getRandomInt, getRandomItem, getRandomItems} = require(`./utils`);
const {MOCK_PATH, MOCK_FILE_NAME} = require(`./constants`);
const DATA_PATH = path.resolve(__dirname, `../../data`);
const SENTENCES_FILE = path.resolve(DATA_PATH, `sentences.txt`);
const TITLES_FILE = path.resolve(DATA_PATH, `titles.txt`);
const CATEGORIES_FILE = path.resolve(DATA_PATH, `categories.txt`);
const COMMENTS_FILE = path.resolve(DATA_PATH, `comments.txt`);

const MIN_ANNOUNCE_COUNT = 1;
const MAX_ANNOUNCE_COUNT = 5;

const MIN_FULL_TEXT_COUNT = 1;

const MIN_MOCK_COUNT = 1;
const MAX_MOCK_COUNT = 1000;

const getDataFromFile = async (file) => {
  let data;
  try {
    data = await fsPromises.readFile(file, {encoding: `utf-8`});
  } catch (err) {
    console.error(chalk.red(err));
    process.exit(1);
  }
  return data.split(`\n`);
};

const getData = async () => {
  const [titles, categories, sentences, comments] = await Promise.all([
    getDataFromFile(TITLES_FILE),
    getDataFromFile(CATEGORIES_FILE),
    getDataFromFile(SENTENCES_FILE),
    getDataFromFile(COMMENTS_FILE)
  ]);
  return {
    titles, categories, sentences, comments
  };
};

const makeTitle = (titles) => getRandomItem(titles);

const makeAnnounceAndFullText = (sentences) => {
  const announcesCount = getRandomInt(MIN_ANNOUNCE_COUNT, MAX_ANNOUNCE_COUNT);
  const fullTextCount = getRandomInt(MIN_FULL_TEXT_COUNT, sentences.length - announcesCount);
  const shuffledSentences = shuffle(sentences, announcesCount + fullTextCount);
  const announce = shuffledSentences.slice(0, announcesCount).join(` `);
  const fullText = shuffledSentences.slice(announcesCount).join(` `);
  return {announce, fullText};
};


const getCreatedDateRange = () => {
  const date = new Date();
  const now = date.getTime();
  date.setMonth(date.getMonth() - 2);
  date.setDate(1);
  const then = date.getTime();
  return {then, now};
};

const makeCreatedDate = ({then, now}) => {
  const randomDate = new Date(getRandomInt(then, now));
  return format(randomDate, `yyyy-MM-dd HH:mm:ss`);
};

const makeComments = (comments) => getRandomItems(comments).map((comment) => ({
  id: nanoid(6),
  text: comment,
}));

const generateOne = (mockData, createdDateRange) => {
  const {titles, categories, sentences, comments} = mockData;
  const {announce, fullText} = makeAnnounceAndFullText(sentences);
  return {
    title: makeTitle(titles),
    announce,
    fullText,
    createdDate: makeCreatedDate(createdDateRange),
    category: getRandomItems(categories),
    id: nanoid(6),
    comments: makeComments(comments),
  };
};

const generateMock = async (count) => {
  const mockData = await getData();
  const createdDateRange = getCreatedDateRange();
  const mock = [...new Array(count)].map(() => generateOne(mockData, createdDateRange));
  try {
    await fsPromises.writeFile(MOCK_PATH, JSON.stringify(mock, null, 4));
  } catch (err) {
    console.error(`Can't write data to file ${MOCK_FILE_NAME}`);
    process.exit(1);
  }
  console.info(chalk.green(`${MOCK_FILE_NAME} created`));
};


const generate = (value) => {
  const parsedValue = Number.parseInt(value, 10);
  const count = parsedValue || MIN_MOCK_COUNT;
  if (count > MAX_MOCK_COUNT) {
    console.error(chalk.red(`No more than ${MAX_MOCK_COUNT} ads`));
    process.exit(1);
  } else if (count < 0) {
    console.error(chalk.red(`Count must be positive integer`));
    process.exit(1);
  }
  generateMock(count);
};

module.exports = {
  generate,
};
