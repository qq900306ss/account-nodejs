const mongoose = require('mongoose');

let BookSchema = new mongoose.Schema({ //可以規定屬性跟 型態
    name: String,
    author: String,
    prices: Number
})

let BookModel = mongoose.model('Book', BookSchema); //對文黨操作的封裝對象 曾刪改查

module.exports = BookModel;
