/**
 * Created by meisam on 07/02/2017.
 */

let express = require('express');
let multer = require('multer');
let exec = require('child_process').exec;
let crypto = require('crypto');
let path = require('path');

let app = express();

let DIR = './uploads/';

let storage = multer.diskStorage({
    destination: DIR,
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return cb(err);
            cb(null, raw.toString('hex') + path.extname(file.originalname))
        })
    }
});

let upload = multer({ storage: storage });

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
    console.log(req.file);

    let command = 'cp ' + req.file.path + ' processed/' + req.file.filename;
    exec(command, function (error, stdout, stderr) {
        console.log(error);
        res.json({ processedFile: req.file.filename});
    });
});

app.get('/api/:p', function (req, res) {
    console.dir(req.params.p);
    res.sendfile(`processed/${req.params.p}`)
});

let PORT = process.env.PORT || 9002;

app.listen(PORT, function () {
    console.log('express is listening on port ' + PORT);
});

