const mongoose = require('mongoose');
const moment = require('moment');

console.log(moment('2023-08-02').toDate()); //轉換日期格式
let AccountSchema = new mongoose.Schema({ //可以規定屬性跟 型態
        // "id": mon id會自動生成
       title: {
           type: String,
           required: true
       },
      time: Date,
      type: {
        type: Number,
        default: -1
      },
      account: {
        type: Number,
        required: true
      },
      
      remarks: {
        type : String
      }
})

//                                   account 是集合名稱
module.exports = AccountSchema;
