'use strict';

const {nanoid} = require(`nanoid`);
const format = require(`date-fns/format`);

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomItem = (arr) => arr[getRandomInt(0, arr.length - 1)];

const shuffle = (array, length = array.length) => {
  length = Math.min(length, array.length);
  const resultArray = array.slice();
  for (let i = resultArray.length - 1; i > (resultArray.length - length - 1); i--) {
    const randomNumber = getRandomInt(0, i);
    [resultArray[randomNumber], resultArray[i]] = [
      resultArray[i],
      resultArray[randomNumber],
    ];
  }

  return resultArray.slice(resultArray.length - length);
};

const getRandomItems = (arr) => shuffle(arr, getRandomInt(1, arr.length));

const generateId = () => nanoid(6);

const formatDate = (date) => format(date, `yyyy-MM-dd HH:mm:ss`);

module.exports = {
  getRandomInt,
  getRandomItem,
  getRandomItems,
  shuffle,
  generateId,
  formatDate,
};
