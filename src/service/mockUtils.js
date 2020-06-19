'use strict';

const fsPromises = require(`fs`).promises;
const {generateId, formatDate} = require(`./utils`);
const {MOCK_PATH} = require(`./constants`);


const Errors = {
  MOCK_PARAMS_ERROR: `MOCK_PARAMS_ERROR`,
  ARTICLE_NOT_FOUND: `ARTICLE_NOT_FOUND`,
};

let _mocks;

const getMocks = async () => {
  if (_mocks) {
    return _mocks;
  }
  let data;
  try {
    data = JSON.parse(await fsPromises.readFile(MOCK_PATH, {encoding: `utf-8`}));
  } catch (err) {
    return [];
  }
  setMocks(data);
  return _mocks;
};

const makeCommentsMap = (comments) => new Map(comments.map(({id, text}) => [id, {id, text}]));
const setMocks = (data) => {
  _mocks = new Map(data.map((item) => [item.id, {...item, comments: makeCommentsMap(item.comments)}]));
};

const sortArticles = (leftArticle, rightArticle) => {
  return new Date(rightArticle.createdDate) - new Date(leftArticle.createdDate);
};

const getArticles = async () => {
  const mocks = await getMocks();
  const articles = Array.from(mocks.values(), ({comments, ...rest}) => ({comments: Array.from(comments.values()), ...rest}));
  articles.sort(sortArticles);
  return articles;
};

const getArticlesShort = async () => {
  const mocks = await getMocks();
  const artcilesShort = Array.from(mocks.values(), ({title, createdDate, id}) => ({title, createdDate, id}));
  artcilesShort.sort(sortArticles);
  return artcilesShort;
};
const getArticleById = async (id) => {
  const mocks = await getMocks();
  const article = mocks.get(id);
  if (!article) {
    throw new Error(Errors.ARTICLE_NOT_FOUND);
  }
  return article;
};

const deleteArticleById = async (articleId) => {
  const mocks = await getMocks();
  mocks.delete(articleId);
  return articleId;
};
const editArticle = async (id, data) => {
  const mocks = await getMocks();
  const article = await getArticleById(id);
  const {title = article.title, announce = article.announce, fullText = article.fullText, category = article.category} = data;
  const editedArticle = {...article, title, announce, fullText, category};
  mocks.set(id, editedArticle);
};


const addArticle = async ({title, announce, fullText, category}) => {
  if (!title || !announce || !category || !category.length) {
    throw new Error(Errors.MOCK_PARAMS_ERROR);
  }
  const mocks = await getMocks();
  const id = generateId();
  const createdDate = formatDate(new Date());
  mocks.set(id, {id, createdDate, title, announce, fullText, category, comments: []});
  return id;
};

const getCommentsByArticleId = async (articleId) => {
  const article = await getArticleById(articleId);
  return Array.from(article.comments.values());
};

const addCommentToArticle = async (articleId, {text}) => {
  const article = await getArticleById(articleId);
  const id = generateId();
  article.comments.set(id, {id, text});
  return id;
};

const deleteCommentById = async (articleId, commentId) => {
  const article = await getArticleById(articleId);
  article.comments.delete(commentId);
};

const getCategories = async () => {
  const mocks = await getMocks();
  const categories = [];
  mocks.forEach(({category}) => {
    categories.push(...category);
  });
  return Array.from(new Set(categories));
};

const searchArticlesByTitle = async (title) => {
  const articles = await getArticlesShort();
  return articles.filter((article) => article.title.toLowerCase().includes(title.toLowerCase()));
};


module.exports = {
  getArticles,
  getArticlesShort,
  getArticleById,
  addArticle,
  editArticle,
  getCommentsByArticleId,
  addCommentToArticle,
  deleteArticleById,
  deleteCommentById,
  getCategories,
  searchArticlesByTitle,
  Errors,
};
