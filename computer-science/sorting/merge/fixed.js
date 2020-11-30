/*
  Write a function that performs mergesort
  Name the function mergeSort
  It will take in a array of numbers and return a sorted array numbers
  
  To read the approach, refer to the class materials at 
  https://btholt.github.io/four-semesters-of-cs/
  
  As always, you can rename describe to be xdescribe to prevent the
  unit tests from running while you're working
  
  There is no visualization mechanism for this algorithm. Use your own
  preferred method of introspection like console.log().
*/

function mergeSort(nums) {
    if (nums.length <= 1) return nums;

    const mid = Math.floor(nums.length / 2);
    const sortedLeft = mergeSort(nums.slice(0, mid));
    const sortedRight = mergeSort(nums.slice(mid));
    return merge(sortedLeft, sortedRight);
}

function merge(arr1, arr2) {
    const merged = [];
    while (arr1.length && arr2.length) {
        if (arr1[0] <= arr2[0]) merged.push(arr1.shift());
        else merged.push(arr2.shift());
    }
    while (arr1.length) {
        merged.push(arr1.shift());
    }
    while (arr2.length) {
        merged.push(arr2.shift());
    }
    return merged;
}

module.exports = {
    mergeSort,
};
