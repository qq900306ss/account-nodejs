    // @param {*} success

    // @param {*} error

module.exports = function(success,error) {
    const mongoose = require('mongoose');

    mongoose.connect('mongodb://127.0.0.1:27017/mydatabase'); //port可寫可不寫



    mongoose.connection.once('open', () => {
        success();
    });
    mongoose.connection.on('error', (err) => {
        error()
    }); //連結失敗

    mongoose.connection.on('close', () => {
        console.log('Mongoose connection closed');
    }); //斷開連結

}