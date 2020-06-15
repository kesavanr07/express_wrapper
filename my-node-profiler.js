var app = require('express')();
var moment = require('moment');

app.use(function(req, res, next) {
    const start = Date.now();
    const current_url = req.protocol + '://' + req.get('host') + req.originalUrl;
    const current_date = moment().format('ddd MMM DD YYYY HH:mm:ss');
    res.once('finish', () => {
        var execution_time = Date.now() - start+ "ms";
        console.log(current_url, current_date, execution_time);
    });  
    next(); 
});