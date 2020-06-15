'use strict';

const express = require(`express`);
const path = require(`path`);
const app = express();
const PORT = 8080;
const {rootRouter} = require(`./routes/root`);

app.set(`view engine`, `pug`);
app.set(`views`, path.join(__dirname, `templates`));
app.use(rootRouter);
app.use(express.static(path.join(__dirname, `public`)));

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
