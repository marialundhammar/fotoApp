const express = require('express');
const cors = require('cors');
const logger = require('morgan');

// instantiate express
const app = express();

// middlewares
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/', require('./routes/index'));

/* app.listen(3000, () => {
    console.log('Server started at http://localhost:3000');
});
 */

module.exports = app;
