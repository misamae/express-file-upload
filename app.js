/**
 * Created by meisam on 07/02/2017.
 */

let express = require('express');
let multer = require('multer');
let exec = require('child_process').exec;

let app = express();

let DIR = './uploads/';

let upload = multer({dest: DIR});

console.log(__dirname);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5555');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/api', function (req, res) {
    res.send('file catcher example');
});

app.post('/api', upload.single('file'), function (req, res, next) {
    console.log(req.file.path);

    let command = 'cp ' + req.file.path + ' processed/' + req.file.filename;
    exec(command, function (error, stdout, stderr) {
        res.status(204).end();
    });
});

app.get('/api/p', function (req, res) {
    res.sendfile('processed/1e4ee0c4b520c940cc19f5f6ed42a405.jpg')
});

let PORT = process.env.PORT || 9002;

app.listen(PORT, function () {
    console.log('express is listening on port ' + PORT);
});

