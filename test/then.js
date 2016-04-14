/**
 * @file waitFor from http://brandonokert.com/2015/08/04/TestingInReact/
 * @author cxtom(cxtom2010@gmail.com)
 */


const then = function (callback, timeout) {
    setTimeout(callback, timeout > 0 ? timeout : 0);
    return {then: then};
};

module.exports = then;
