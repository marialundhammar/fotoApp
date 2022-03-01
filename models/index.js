
//require('dotenv').config();

// Setting up the database connection

const knex = require('knex')({
	debug: true,
	client: 'mysql',
	connection: {
		host: process.env.DB_HOST || 'localhost',
		port: process.env.DB_PORT || 8889,
		charset: process.env.DB_CHARSET || 'utf8mb4',
		database: process.env.DB_NAME || 'photoApp',
		user: process.env.DB_USER || '',
		password: process.env.DB_PASSWORD || '',
	}
});


const bookshelf = require('bookshelf')(knex);

const models = {};
models.User = require('./User')(bookshelf);

models.Photo = require('./Photo')(bookshelf);


module.exports = {
	bookshelf,
	...models,
};
