const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('db.json')
const db = low(adapter)
 
// Set some defaults
// db.defaults({ posts: [], user: {} })
//   .write()
 
// db.get('posts').push({id:1 , title : 'Hello World', content : 'This is my first post!'}).write();
// console.log(db.get('posts').value());

db.get('posts').find({title : 'HeWorld'}).assign({title : 'Hello'}).write();
