var path = require('path'),
    express = require('express'),
    app = express();

var port = 3000;

app.use(express.static(path.join(__dirname)));

app.get('/', function(req, res) {
    res.sendFile('index');
});

app.get('*', function(req, res) {
    res.redirect('/');
});

app.listen(port, function() {
    console.log("server started on port", port)
});
