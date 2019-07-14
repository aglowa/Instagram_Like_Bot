const ig = require('./instagram');

(async () => {
    await ig.initialize();

    await ig.login('yourlogin', 'yourpassword');

    await ig.likeTagsProcess(['cars']);

    debugger;
})()
