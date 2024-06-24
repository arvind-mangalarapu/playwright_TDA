const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../../cms/data/tda/pages.json");
const rawData = fs.readFileSync(dataPath);
const testData = JSON.parse(rawData);

console.log("Parsed JSON data:", testData);

const homePage = (slug) => testData.find((page) => page.slug === slug);

test.only("check home page content", async ({ page }) => {
  await page.goto("https://tda-cmsv2.able.do/");

  const checks = [
    {
      expected: homePage.meta.title,
      actual: async (page) => await page.title(),
    },
    {
      expected: homePage.blocks[0].content[0].children
        .map((child) => child.text)
        .join(""),
      actual: async (page) =>
        await page
          .getByRole("heading", { name: "It takes a team to move a" })
          .textContent(),
    },
    {
      expected: homePage.blocks[0].content[1].children[0].text,
      actual: async (page) =>
        await page.getByText("Simplify the process of").textContent(),
    },
    {
      expected: homePage.blocks[1].label[0].children[0].text,
      actual: async (page) =>
        await page.getByRole("link", { name: "Drive with Us" }).textContent(),
    },
    {
      expected: homePage.blocks[1].label[0].children[0].text,
      actual: async (page) =>
        await page
          .locator("h1")
          .filter({ hasText: "Drive with Us" })
          .textContent(),
    },
    {
      expected: homePage.blocks[3].columns[0].title[0].children[0].text,
      actual: async (page) => await page.getByText("BENEFITS").textContent(),
    },
    {
      expected: homePage.blocks[3].columns[0].body[0].children[0].text,
      actual: async (page) =>
        await page.getByText("Same-day pay. Set your own").textContent(),
    },
    {
      expected: homePage.blocks[4].label[0].children[0].text,
      actual: async (page) =>
        await page.getByRole("link", { name: "Apply Now" }).textContent(),
    },
    {
      expected: homePage.blocks[6].title[0].children
        .map((child) => child.text)
        .join(""),
      actual: async (page) =>
        await page
          .getByRole("heading", { name: "Our team of experienced" })
          .textContent(),
    },
    {
      expected: homePage.blocks[7].title[0].children[0].text,
      actual: async (page) =>
        await page.getByText("Our Services").textContent(),
    },
    {
      expected: homePage.blocks[7].columns[0].body[0].children[0].text,
      actual: async (page) =>
        await page.getByText("Whatever kind of trucks you").textContent(),
    },
    {
      expected: homePage.blocks[7].columns[1].linkLabel[0].children[0].text,
      actual: async (page) =>
        await page
          .locator("div")
          .filter({ hasText: /^LEARN MORE$/ })
          .nth(2)
          .textContent(),
    },
    {
      expected: homePage.blocks[7].columns[2].title[0].children[0].text,
      actual: async (page) =>
        await page
          .getByRole("heading", { name: "LAST MILE" })
          .nth(1)
          .textContent(),
    },
    {
      expected: homePage.blocks[8].label[0].children[0].text,
      actual: async (page) =>
        await page
          .getByRole("link", { name: "Get a Quote" })
          .nth(2)
          .textContent(),
    },
  ];

  for (const check of checks) {
    const actualValue = await check.actual(page);
    expect(actualValue).toBe(check.expected);
  }
});
