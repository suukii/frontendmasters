function insertionSort(nums) {
    for (let i = 1; i < nums.length; i++) {
        const n = nums[i];
        let insertPos = compareBackwards(n, i);
        nums[insertPos] = n;
    }

    // **********************
    function compareBackwards(target, pos) {
        while (nums[pos - 1] > target) {
            nums[pos] = nums[pos - 1];
            pos--;
        }
        return pos;
    }
}

module.exports = {
    insertionSort,
};
