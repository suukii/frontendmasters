function isValidName(name) {
    if (typeof name != 'string') return false;
    return name.trim().length >= 3;
}

function hoursAttended(attended, length) {
    if (typeof attended == 'string' && attended.trim() != '') {
        attended = Number(attended);
    }
    if (typeof length == 'string' && length.trim() != '') {
        length = Number(length);
    }
    if (
        typeof attended == 'number' &&
        typeof length == 'number' &&
        attended <= length &&
        attended > 0 &&
        length >= 0 &&
        attended % 1 == 0 &&
        length % 1 == 0
    ) {
        return true;
    }
    return false;
}

// tests:

let i = 31;
console.log(isValidName('Frank') === true, ++i);
console.log(hoursAttended(6, 10) === true, ++i);
console.log(hoursAttended(6, '10') === true, ++i);
console.log(hoursAttended('6', 10) === true, ++i);
console.log(hoursAttended('6', '10') === true, ++i);
console.log(isValidName(false) === false, ++i);
console.log(isValidName(null) === false, ++i);
console.log(isValidName(undefined) === false, ++i);
console.log(isValidName('') === false, ++i);
console.log(isValidName('  \t\n') === false, ++i);
console.log(isValidName('X') === false, ++i);
console.log(hoursAttended('', 6) === false, ++i);
console.log(hoursAttended(6, '') === false, ++i);
console.log(hoursAttended('', '') === false, ++i);
console.log(hoursAttended('foo', 6) === false, ++i);
console.log(hoursAttended(6, 'foo') === false, ++i);
console.log(hoursAttended('foo', 'bar') === false, ++i);
console.log(hoursAttended(null, null) === false, ++i);
console.log(hoursAttended(null, undefined) === false, ++i);
console.log(hoursAttended(undefined, null) === false, ++i);
console.log(hoursAttended(undefined, undefined) === false, ++i);
console.log(hoursAttended(false, false) === false, ++i);
console.log(hoursAttended(false, true) === false, ++i);
console.log(hoursAttended(true, false) === false, ++i);
console.log(hoursAttended(true, true) === false, ++i);
console.log(hoursAttended(10, 6) === false, ++i);
console.log(hoursAttended(10, '6') === false, ++i);
console.log(hoursAttended('10', 6) === false, ++i);
console.log(hoursAttended('10', '6') === false, ++i);
console.log(hoursAttended(6, 10.1) === false, ++i);
console.log(hoursAttended(6.1, 10) === false, ++i);
console.log(hoursAttended(6, '10.1') === false, ++i);
console.log(hoursAttended('6.1', 10) === false, ++i);
console.log(hoursAttended('6.1', '10.1') === false, ++i);
