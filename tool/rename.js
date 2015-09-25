/**
 * @file hehe
 * @author leon(ludafa@outlook.com)
 */

var fs = require('fs');
var path = require('path');

function walk(file) {

    var stats = fs.statSync(file);

    if (stats.isFile()) {

        if (path.extname(file) !== '.jsx') {
            return;
        }

        fs.renameSync(file, file.replace('.jsx', '.js'));
        return;
    }


    if (stats.isDirectory()) {
        fs
            .readdirSync(file)
            .forEach(function (nextFile) {
                walk(path.join(file, nextFile));
            });
        return;
    }


}

walk(path.join(__dirname, '../example'));
