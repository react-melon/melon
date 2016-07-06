/**
 * @file waitFor from http://brandonokert.com/2015/08/04/TestingInReact/
 * @author cxtom(cxtom2008@gmail.com)
 */

let waitsInProgress = [];

export default function waitFor(test, message, done, timeLeft) {
    timeLeft = timeLeft === undefined ? 100 : timeLeft;
    waitsInProgress.push(setTimeout(() => {
        if (timeLeft <= 0) {
            throw new Error(message);
        }
        else if (test()) {
            done();
        }
        else {
            waitFor(test, message, done, timeLeft - 10);
        }
    }, 10));
}

waitFor.clear = () => waitsInProgress.map(clearTimeout); // optionally call this in the beforeEach to ensure rogue tests are not still waiting
