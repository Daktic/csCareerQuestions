//connect to reddit api
const snoowrap = require('snoowrap');
require('dotenv').config();

exports.r = new snoowrap({
    userAgent: process.env.USERAGENT,
    clientId: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    username: process.env.USERNAME_REDDIT,
    password: process.env.PASSWORD
  });

