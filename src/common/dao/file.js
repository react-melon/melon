/**
 * @file common/dao/file
 * @author leon(ludafa@outlook.com)
 */

import ejson from '../ejson';

export function upload(srcId, name, file) {

    let fd = new FormData();

    fd.append(name, file);
    fd.append('srcId', srcId);

    return ejson.post('/file/upload', {
        headers: {
            'Content-Type': `multipart/form-data`
        },
        body: fd
    }).then((data) => {
        return data.url;
    });

}
