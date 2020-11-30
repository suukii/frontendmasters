function bubbleSort(nums) {
    let swapped = false;
    do {
        swapped = false;
        for (let i = 0; i < nums.length - 1; i++) {
            if (nums[i] > nums[i + 1]) {
                swap(i, i + 1);
                swapped = true;
            }
        }
    } while (swapped);

    // ******************
    function swap(i, j) {
        [nums[i], nums[j]] = [nums[j], nums[i]];
    }
}
module.exports = {
    bubbleSort,
};
