const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../../cms/data/tda/pages.json");
const rawData = fs.readFileSync(dataPath);
const testData = JSON.parse(rawData);

console.log("Parsed JSON data:", testData);

const faqsPage = testData[15];

test("check page title", async ({ page }) => {
  await page.goto("https://tda-cmsv2.able.do/");
  await page.getByRole("link", { name: "faq" }).click();
  const actualTitle = await page.title();
  expect(actualTitle).toBe(faqsPage.meta.title);
});

test("check page content", async ({ page }) => {
  await page.goto("https://tda-cmsv2.able.do/faqs");
  expect(
    await page.getByRole("main").getByText("FAQ", { exact: true }).textContent()
  ).toBe(faqsPage.subtitle[0].children[0].text);
  console.log(faqsPage.subtitle[0].children[0].text);

  expect(await page.getByText("What is DriveAway?").textContent()).toBe(
    faqsPage.blocks[0].columns[0].title[0].children[0].text
  );
  console.log(faqsPage.blocks[0].columns[0].title[0].children[0].text);

  await page.getByText("What is DriveAway?").click();
  expect(await page.getByText("DriveAway is a transport").textContent()).toBe(
    faqsPage.blocks[0].columns[0].body[0].children[0].text
  );
  console.log(faqsPage.blocks[0].columns[0].body[0].children[0].text);

  await page.getByText("Is all DriveAway the same?").click();
  expect(
    await page.getByText("There are several DriveAway").textContent()
  ).toBe(faqsPage.blocks[0].columns[1].body[1].children[0].text);
  console.log(faqsPage.blocks[0].columns[1].body[1].children[0].text);

  expect(
    await page
      .getByText(
        "If a driver comes on with Team DriveAway in one driving division, do they need"
      )
      .textContent()
  ).toBe(faqsPage.blocks[0].columns[17].title[0].children[0].text);

  await page
    .getByText(
      "If a driver comes on with Team DriveAway in one driving division, do they need"
    )
    .click();

  await await page
    .getByText(
      "If a driver comes on with Team DriveAway in one driving division, do they need"
    )
    .click();
  expect(
    await page.getByText("No. If a driver comes on with").textContent()
  ).toBe(faqsPage.blocks[0].columns[17].body[0].children[0].text);

  expect(
    await page
      .getByRole("link", { name: "Need help? Contact us" })
      .textContent()
  ).toBe(faqsPage.blocks[1].label[0].children[0].text);
  console.log(faqsPage.blocks[1].label[0].children[0].text);
});
