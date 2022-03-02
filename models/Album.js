module.exports = (bookshelf) => {
    return bookshelf.model('Almbum', {
        tableName: 'album'
    });
};
