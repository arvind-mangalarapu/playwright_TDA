const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../../cms/data/tda/pages.json");
const rawData = fs.readFileSync(dataPath);
const testData = JSON.parse(rawData);

console.log("Parsed JSON data:", testData);

const aboutUsPage = testData[14];

test.only("check page title", async ({ page }) => {
  await page.goto("https://tda-cmsv2.able.do/");
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "about us" })
    .click();
  const actualTitle = await page.title();
  expect(actualTitle).toBe(aboutUsPage.meta.title);
});

test("check page content", async ({ page }) => {
  await page.goto("https://tda-cmsv2.able.do/about-us");

  expect(await page.getByText("Meet our Home Team").textContent()).toBe(
    aboutUsPage.subtitle[0].children[0].text
  );
  console.log(aboutUsPage.subtitle[0].children[0].text);

  // await page.getByText("We're all about the hustle").click();
  // await page.getByRole("heading", { name: "OUR CULTURE & VALUES" }).click();
  // await page
  //   .getByRole("heading", { name: "We don't just talk team, we" })
  //   .click();
  // await page.getByText("STEVE POWELL, DISPATCHER").click();
  // const page1Promise = page.waitForEvent("popup");
  // await page.getByRole("link", { name: "unitedroad.com" }).click();

  // const page2Promise = page.waitForEvent("popup");
  // await page.getByRole("link", { name: "driveawayusa.com" }).click();
});
