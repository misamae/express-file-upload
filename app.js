/**
 * Created by meisam on 07/02/2017.
 */

let express = require('express');
let multer = require('multer');
let fs = require('fs');
let app = express();

let DIR = './uploads/';

let upload = multer({dest: DIR});

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5555');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// app.use(multer({
//     dest: DIR,
//     rename: function (fieldname, filename) {
//         return filename + Date.now();
//     },
//     onFileUploadStart: function (file) {
//         console.log(file.originalname + ' is starting ...');
//     },
//     onFileUploadComplete: function (file) {
//         console.log(file.fieldname + ' uploaded to  ' + file.path);
//     }
// }).single('file'));

app.get('/api', function (req, res) {
    res.send('file catcher example');
});

app.post('/api', upload.single('file'), function (req, res, next) {
    // console.log(req);
    // upload(req, res, function (err) {
    //     if (err) {
    //         return res.end(err.toString());
    //     }
    //
    //     res.end('File is uploaded');
    // });
    console.log('is file uploaded');
});

let PORT = process.env.PORT || 9002;

app.listen(PORT, function () {
    console.log('express is listening on port ' + PORT);
});

