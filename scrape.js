const { r } = require('./connection.js');


r.getTop('cscareerquestions',{
    time: 'all',
    limit: 10
}).then(console.log);

