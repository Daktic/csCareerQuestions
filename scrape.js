const { r } = require('./connection.js');


r.getHot().map(post => post.title).then(console.log);