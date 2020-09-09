function getFile(file) {
    return new Promise(function (resolve) {
        fakeAjax(file, resolve);
    });
}

async function loadFiles(files) {
    // request all files concurrently
    var prs = files.map(getFile);
    // print in order, sequentially
    for (const pr of prs) {
        console.log(await pr);
    }

    // *******************************

    // 我们不能用 forEach 或者其他数组遍历方法，为什么？

    // 如果要用 await，我们就需要把 forEach 的回调函数改为 async 函数，
    // 这样一来，回调函数的返回值就变成了 promise，
    // forEach 并不知道怎么处理 promise，所以它不会阻塞这些 promise，
    // 打印值的顺序也就不能保证。

    // JS 的所有数组遍历方法都是 sync iterator，它们碰到 promise 不会停下来等。
    // JS 并不支持 async iterator(checkout github/getify/fasy)

    prs.forEach(async function (pr) {
        console.log(await pr);
    });
}

loadFiles(['file1', 'file2', 'file3']);

// **************************************

function fakeAjax(url, cb) {
    var fake_responses = {
        file1: 'The first text',
        file2: 'The middle text',
        file3: 'The last text',
    };
    var randomDelay = (Math.round(Math.random() * 1e4) % 8000) + 1000;

    console.log('Requesting: ' + url);

    setTimeout(function () {
        cb(fake_responses[url]);
    }, randomDelay);
}
