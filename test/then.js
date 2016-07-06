/**
 * @file waitFor from http://brandonokert.com/2015/08/04/TestingInReact/
 * @author cxtom(cxtom2008@gmail.com)
 */


export default function then(callback, timeout) {
    setTimeout(callback, timeout > 0 ? timeout : 0);
    return {then};
}

