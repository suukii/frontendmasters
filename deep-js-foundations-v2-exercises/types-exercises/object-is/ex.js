if (!Object.is || true) {
    Object.is = function ObjectIs(x, y) {
        if (isNegZero(x) || isNegZero(y)) return isNegZero(x) && isNegZero(y);
        else if (isNaN(x) && isNaN(y)) return true;
        return x === y;

        // *********
        function isNegZero(x) {
            return x === 0 && 1 / x === -Infinity;
        }
        function isNaN(x) {
            return x !== x;
        }
    };
}

// tests:
console.log(Object.is(42, 42) === true);
console.log(Object.is('foo', 'foo') === true);
console.log(Object.is(false, false) === true);
console.log(Object.is(null, null) === true);
console.log(Object.is(undefined, undefined) === true);
console.log(Object.is(NaN, NaN) === true);
console.log(Object.is(-0, -0) === true);
console.log(Object.is(0, 0) === true);

console.log(Object.is(-0, 0) === false);
console.log(Object.is(0, -0) === false);
console.log(Object.is(0, NaN) === false);
console.log(Object.is(NaN, 0) === false);
console.log(Object.is(42, '42') === false);
console.log(Object.is('42', 42) === false);
console.log(Object.is('foo', 'bar') === false);
console.log(Object.is(false, true) === false);
console.log(Object.is(null, undefined) === false);
console.log(Object.is(undefined, null) === false);
