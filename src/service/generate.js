'use strict';

const fsPromises = require(`fs`).promises;
const path = require(`path`);
const chalk = require(`chalk`);
const {format} = require(`date-fns`);
const {shuffle, getRandomInt, getRandomItem} = require(`./utils`);
const FILE_NAME = `mocks.json`;
const DATA_PATH = path.resolve(__dirname, `../../data`);
const SENTENCES_FILE = path.resolve(DATA_PATH, `sentences.txt`);
const TITLES_FILE = path.resolve(DATA_PATH, `titles.txt`);
const CATEGORIES_FILE = path.resolve(DATA_PATH, `categories.txt`);

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
  const [titles, categories, sentences] = await Promise.all([
    getDataFromFile(TITLES_FILE),
    getDataFromFile(CATEGORIES_FILE),
    getDataFromFile(SENTENCES_FILE)
  ]);
  return {
    titles, categories, sentences
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

const makeCategory = (categories) => shuffle(categories, getRandomInt(1, categories.length));

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

const generateOne = (mockData, createdDateRange) => {
  const {titles, categories, sentences} = mockData;
  const {announce, fullText} = makeAnnounceAndFullText(sentences);
  return {
    title: makeTitle(titles),
    announce,
    fullText,
    createdDate: makeCreatedDate(createdDateRange),
    category: makeCategory(categories),
  };
};

const generateMock = async (count) => {
  const mockData = await getData();
  const createdDateRange = getCreatedDateRange();
  const mock = [...new Array(count)].map(() => generateOne(mockData, createdDateRange));
  const mockPath = path.resolve(__dirname, `../../${FILE_NAME}`);
  try {
    await fsPromises.writeFile(mockPath, JSON.stringify(mock, null, 4));
  } catch (err) {
    console.error(`Can't write data to file ${FILE_NAME}`);
    process.exit(1);
  }
  console.info(chalk.green(`${FILE_NAME} created`));
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
