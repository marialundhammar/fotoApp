module.exports = (bookshelf) => {
    return bookshelf.model('User', {
        tableName: 'users',
        photos() {
            return this.hasMany('Photo');
        }

    });

};
