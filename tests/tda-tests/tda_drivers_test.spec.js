const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../../cms/data/tda/pages.json");
const rawData = fs.readFileSync(dataPath);
const testData = JSON.parse(rawData);

console.log("Parsed JSON data:", testData);

const driversPage = testData[16];

test("check page title", async ({ page }) => {
  await page.goto("https://tda-cmsv2.able.do/");
  await page.getByRole("link", { name: "drivers", exact: true }).click();

  const actualTitle = await page.title();
  expect(actualTitle).toBe(driversPage.meta.title);
});

test("check page content", async ({ page }) => {
  await page.goto("https://tda-cmsv2.able.do/drivers");

  const actualHeading = await page
    .getByRole("heading", { name: "Drivers", exact: true })
    .textContent();
  expect(actualHeading).toBe(driversPage.title);
  console.log(driversPage.title);

  const applyNowLink = await page
    .getByRole("link", { name: "Apply Online Now" })
    .textContent();
  expect(applyNowLink).toBe(driversPage.blocks[1].label[0].children[0].text);
  console.log(driversPage.blocks[1].label[0].children[0].text);

  expect(await page.getByText("We are always looking for").textContent()).toBe(
    driversPage.blocks[2].content[0].children[0].text
  );

  expect(
    await page
      .getByRole("heading", { name: "TAKE LOADS OFF YOUR MIND" })
      .textContent()
  ).toBe(driversPage.blocks[3].columns[1].title[0].children[0].text);
  console.log(driversPage.blocks[3].columns[1].title[0].children[0].text);

  expect(await page.getByText("We make managing your").textContent()).toBe(
    driversPage.blocks[3].columns[0].body[0].children[0].text
  );
  console.log(driversPage.blocks[3].columns[0].body[0].children[0].text);

  expect(
    await page.getByText("There is always room to grow").textContent()
  ).toBe(driversPage.blocks[3].columns[2].body[0].children[0].text);
  console.log(driversPage.blocks[3].columns[2].body[0].children[0].text);

  expect(
    await page.getByText("Whether you’re a NON CDL,").first().textContent()
  ).toBe(driversPage.blocks[5].sectionTitle[0].children[0].text);
  console.log(driversPage.blocks[5].sectionTitle[0].children[0].text);

  expect(await page.getByText("DRIVE WITH THE TEAM").textContent()).toBe(
    driversPage.blocks[5].title[0].children[0].text
  );
  console.log(driversPage.blocks[5].title[0].children[0].text);

  expect(await page.getByText("I am very grateful to be a").textContent()).toBe(
    driversPage.blocks[6].quote[0].children[0].text
  );
  console.log(driversPage.blocks[6].quote[0].children[0].text);

  // forms in drivers
  await page.getByLabel("First Name *").click();
  await page.getByLabel("First Name *").fill("arvind");
  await page.getByLabel("Last Name").click();
  await page.getByLabel("Last Name").fill("mang");
  await page.getByLabel("Email *").click();
  await page.getByLabel("Email *").fill("example@gmail.com");
  await page.getByLabel("Phone number *").click();
  await page.getByLabel("Phone number *").fill("9876543210");
  await page.getByLabel("Zipcode *").click();
  await page.getByLabel("Zipcode *").fill("500003");
  await page.getByLabel("State *").click();
  await page.getByLabel("State *").fill("telangana");
  await page.getByLabel("What class of license do you").selectOption("B");
  await page.getByLabel("How much DriveAway experience").click();
  await page.getByLabel("How much DriveAway experience").fill("3");
  await page
    .getByLabel("How did you hear about us? *")
    .selectOption("Referral");
  await page.getByLabel("Best way to contact *").selectOption("Text");
  await page.getByLabel("Best time to talk *").click();
  await page.getByLabel("Best time to talk *").press("Tab");
  await page.getByRole("button", { name: "Submit" }).click();
});
