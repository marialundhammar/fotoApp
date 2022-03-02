module.exports = (bookshelf) => {
    return bookshelf.model('User', {
        tableName: 'users'
        /*        photos() {
                   return this.belongsToMany('photos');
               } */
    });

};
