const puppeteer = require('puppeteer');

const BASE_URL = 'https://instagram.com/';

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

        await instagram.page.waitFor(2000);

    /* Writing the username and password */

        await instagram.page.type('input[name="username"]',username, { delay: 200 });
        await instagram.page.type('input[name="password"]',password, { delay: 200 });

        debugger;
    }

}

module.exports = instagram;
