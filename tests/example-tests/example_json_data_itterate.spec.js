// not yet compleated

const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../../cms/data/tda/pages.json");
const rawData = fs.readFileSync(dataPath);
const testData = JSON.parse(rawData);

console.log("Parsed JSON data:", testData);

const homePage = testData[17];

test("check page title", async ({ page }) => {
  await page.goto("https://tda-cmsv2.able.do/");

  const actualTitle = await page.title();

  expect(actualTitle).toBe(homePage.meta.title);
});

test("check home page content", async ({ page }) => {
  await page.goto("https://tda-cmsv2.able.do/");

  // the actual json data

  const titleText = homePage.blocks[6].title[0].children
    .map((child) => child.text)
    .join("");

  console.log(titleText);

  // tests
  const actualHeading = await page
    .getByRole("heading", { name: "It takes a team to move a" })
    .textContent();
  expect(actualHeading).toBe(
    homePage.blocks[0].content[0].children.map((child) => child.text).join("")
  );

  const actualText = await page
    .getByText("Simplify the process of")
    .textContent();
  expect(actualText).toBe(homePage.blocks[0].content[1].children[0].text);

  const actualLinkText = await page
    .getByRole("link", { name: "Drive with Us" })
    .textContent();
  expect(actualLinkText).toBe(homePage.blocks[1].label[0].children[0].text);

  const iconLogoHead = await page
    .locator("h1")
    .filter({ hasText: "Drive with Us" })
    .textContent();
  expect(iconLogoHead).toBe(homePage.blocks[1].label[0].children[0].text);

  const iconLogoCardHead = await page.getByText("BENEFITS").textContent();

  expect(iconLogoCardHead).toBe(
    homePage.blocks[3].columns[0].title[0].children[0].text
  );

  const iconLogoCardBody = await page
    .getByText("Same-day pay. Set your own")
    .textContent();

  expect(iconLogoCardBody).toBe(
    homePage.blocks[3].columns[0].body[0].children[0].text
  );

  const applyNowLink = await page
    .getByRole("link", { name: "Apply Now" })
    .textContent();
  expect(applyNowLink).toBe(homePage.blocks[4].label[0].children[0].text);

  const imgWithTest = await page
    .getByRole("heading", { name: "Our team of experienced" })
    .textContent();

  expect(imgWithTest).toBe(
    homePage.blocks[6].title[0].children.map((child) => child.text).join("")
  );

  const ourServices = await page.getByText("Our Services").textContent();
  expect(ourServices).toBe(homePage.blocks[7].title[0].children[0].text);
  console.log(homePage.blocks[7].title[0].children[0].text);

  const ourServicesCard1 = await page
    .getByText("Whatever kind of trucks you")
    .textContent();

  expect(ourServicesCard1).toBe(
    homePage.blocks[7].columns[0].body[0].children[0].text
  );
  console.log(homePage.blocks[7].columns[0].body[0].children[0].text);

  const learnMoreLink = await page
    .locator("div")
    .filter({ hasText: /^LEARN MORE$/ })
    .nth(2)
    .textContent();

  expect(learnMoreLink).toBe(
    homePage.blocks[7].columns[1].linkLabel[0].children[0].text
  );

  const lastMileCard = await page
    .getByRole("heading", { name: "LAST MILE" })
    .nth(1)
    .textContent();

  expect(lastMileCard).toBe(
    homePage.blocks[7].columns[2].title[0].children[0].text
  );

  const getQuoteLink = await page
    .getByRole("link", { name: "Get a Quote" })
    .nth(2)
    .textContent();

  expect(getQuoteLink).toBe(homePage.blocks[8].label[0].children[0].text);
});
