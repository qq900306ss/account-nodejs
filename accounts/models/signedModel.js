const mongoose = require('mongoose');

let SignedSchema = new mongoose.Schema({ //可以規定屬性跟 型態
        // "id": mon id會自動生成
       username: {
           type: String,
           required: true
       },
      password: {
        type: String,
        required: true
      }
})

let SignedModel = mongoose.model('users', SignedSchema); //對文黨操作的封裝對象 曾刪改查
//                                   account 是集合名稱
module.exports = SignedModel;
