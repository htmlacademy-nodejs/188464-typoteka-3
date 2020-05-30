'use strict';

const fs = require(`fs`);
const path = require(`path`);
const {format} = require(`date-fns`);
const {shuffle, getRandomInt, getRandomItem} = require(`./utils`);
const FILE_NAME = `mocks.json`;

const MIN_ANNOUNCE_COUNT = 1;
const MAX_ANNOUNCE_COUNT = 5;

const MIN_MOCK_COUNT = 1;
const MAX_MOCK_COUNT = 1000;

const titles = [`Ёлки. История деревьев`,
  `Как перестать беспокоиться и начать жить`,
  `Как достигнуть успеха не вставая с кресла`,
  `Обзор новейшего смартфона`,
  `Лучше рок-музыканты 20-века`,
  `Как начать программировать`,
  `Учим HTML и CSS`,
  `Что такое золотое сечение`,
  `Как собрать камни бесконечности`,
  `Борьба с прокрастинацией`,
  `Рок — это протест`,
  `Самый лучший музыкальный альбом этого года`];

const sentences = [`Ёлки — это не просто красивое дерево. Это прочная древесина.`,
  `Первая большая ёлка была установлена только в 1938 году.`,
  `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
  `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
  `Собрать камни бесконечности легко, если вы прирожденный герой.`,
  `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
  `Программировать не настолько сложно, как об этом говорят.`,
  `Простые ежедневные упражнения помогут достичь успеха.`,
  `Это один из лучших рок-музыкантов.`,
  `Он написал больше 30 хитов.`,
  `Из под его пера вышло 8 платиновых альбомов.`,
  `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
  `Достичь успеха помогут ежедневные повторения.`,
  `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
  `Как начать действовать? Для начала просто соберитесь.`,
  `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры.`,
  `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`];

const categories = [`Деревья`, `За жизнь`, `Без рамки`, `Разное`, `IT`, `Музыка`, `Кино`, `Программирование`, `Железо`];

const makeTitle = () => getRandomItem(titles);

const makeAnnounceAndFullText = () => {
  const shuffledSentences = shuffle(sentences);
  const announcesCount = getRandomInt(MIN_ANNOUNCE_COUNT, MAX_ANNOUNCE_COUNT);
  const announceSentences = shuffledSentences.slice(0, announcesCount);
  const fullTextSentences = shuffledSentences.slice(announcesCount, getRandomInt(announcesCount, shuffledSentences.length));
  return [announceSentences.join(` `), fullTextSentences.join(` `)];
};

const makeCategory = () => shuffle(categories).slice(0, getRandomInt(1, categories.length - 1));

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

const generateOne = (createdDateRange) => {
  const [announce, fullText] = makeAnnounceAndFullText();
  return {
    title: makeTitle(),
    announce,
    fullText,
    createdDate: makeCreatedDate(createdDateRange),
    category: makeCategory(),
  };
};

const generateMock = (count) => {
  const createdDateRange = getCreatedDateRange();
  const mock = [...new Array(count)].map(() => generateOne(createdDateRange));
  const mockPath = path.resolve(__dirname, `../../${FILE_NAME}`);
  fs.writeFile(mockPath, JSON.stringify(mock, null, 4), (err) => {
    if (err) {
      console.error(`Can't write data to file ${FILE_NAME}`);
      process.exit(1);
    }
    console.info(`${FILE_NAME} created`);
  });
};


const generate = (value) => {
  const parsedValue = Number.parseInt(value, 10);
  const count = parsedValue || MIN_MOCK_COUNT;
  if (count > MAX_MOCK_COUNT) {
    console.error(`No more than ${MAX_MOCK_COUNT} ads`);
    process.exit(1);
  } else if (count < 0) {
    console.error(`Count must be positive integer`);
    process.exit(1);
  }
  generateMock(count);
};

module.exports = {
  generate,
};
