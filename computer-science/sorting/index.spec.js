const { insertionSort } = require('./insertion/fixed.js');
const { bubbleSort } = require('./bubble/fixed.js');
const { mergeSort } = require('./merge/fixed.js');
const { quickSort } = require('./quick/fixed.js');

var sorted = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

describe('insertion sort', function () {
    it('should sort correctly', () => {
        var nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
        insertionSort(nums);
        expect(nums).toEqual(sorted);
    });
});

describe('bubble sort', function () {
    it('should sort correctly', () => {
        var nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
        bubbleSort(nums);
        expect(nums).toEqual(sorted);
    });
});

describe('merge sort', function () {
    it('should sort correctly', () => {
        var nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
        expect(mergeSort(nums)).toEqual(sorted);
    });
});

describe('quick sort', function () {
    it('should sort correctly', () => {
        var nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
        expect(quickSort(nums)).toEqual(sorted);
    });
});
