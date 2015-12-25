/**
 * @file common/util/random
 * @author leon(ludafa@outlook.com)
 */

export default function () {
    return Math.random().toString(36).substr(2, 8);
}
