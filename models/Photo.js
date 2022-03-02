module.exports = (bookshelf) => {
    return bookshelf.model('Photo', {
        tableName: 'photos',
        users() {
            return this.belongsTo('User');   // books.author_id = 3   ->   authors.id = 3 (single author)
        }
    });
};


