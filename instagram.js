/* This version of program run correctly only if Polish language  is setting on Instagram */

const puppeteer = require('puppeteer');

const BASE_URL = 'https://instagram.com/';

const TAG_URL = (tag) => 'https://www.instagram.com/explore/tags/' + tag;

const instagram = {
    browser: null,
    page: null,


initialize: async () => {
    instagram.browser = await puppeteer.launch({
        headless: false
    });

    instagram.page = await instagram.browser.newPage();

   
    },

    login: async (username,password) => {

        await instagram.page.goto(BASE_URL, { waitUntil: "networkidle2" });

        let loginButton = await instagram.page.$x('//a[contains(text(),"Zaloguj się")]');

    /* Click on the login url button */

        await loginButton[0].click();

        await instagram.page.waitForNavigation({ waitUntil: "networkidle2" });

        await instagram.page.waitFor(4000);

    /* Writing the username and password */

        await instagram.page.type('input[name="username"]',username, { delay: 200 });
        await instagram.page.type('input[name="password"]',password, { delay: 200 });

    /* Clicking on the login button */
        loginButton = await instagram.page.$x('//div[contains(text(),"Zaloguj się")]');
        await loginButton[0].click();

    /* Accepting notifications */
        await instagram.page.waitFor(2000);
        notificationsButton = await instagram.page.$x('//button[contains(text(),"Włącz")]');
        await notificationsButton[0].click();

        
    },

    likeTagsProcess: async (tags = []) => {

        for (let tag of tags) {

        /* Go to the tag page */
            await instagram.page.goto(TAG_URL(tag), { waitUntil: 'networkidle2' });
            await instagram.page.waitFor(1000);

            let posts = await instagram.page.$$('article > div:nth-child(3) img[decoding="auto"]');

            for (let i = 0; i < 3; i++) {
                let post = posts[i];

            /* Click on the post */

                await post.click();

            /* Wait for the model to appear */

                await instagram.page.waitFor('span[id="react-root"][aria-hidden="true"]');
                await instagram.page.waitFor(1000);

                let isLikable = await instagram.page.$('span[aria-label="Lubię to!"]');

                if (isLikable) {
                    await instagram.page.click('span[aria-label="Lubię to!"]');

                }

                await instagram.page.waitFor(3000);

            /* Close the model*/
                let closeModalButton = await instagram.page.$x('//button[contains(text(), "Zamknij")]');
                await closeModalButton[0].click();
                await instagram.page.waitFor(1000);
            }

            await instagram.page.waitFor(60000);
        }
    }
}

module.exports = instagram;
