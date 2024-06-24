const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

// Path to your JSON data file
const dataPath = path.join(__dirname, "../../cms/data/tda/pages.json");

// Read and parse JSON data
const rawData = fs.readFileSync(dataPath, "utf8");
const testData = JSON.parse(rawData);

// Function to get page details by slug
const getPageBySlug = (slug) => testData.find((page) => page.slug === slug);

const slug = "services/moves-we-make"; // Replace with the page slug

test("check page content and title", async ({ page }) => {
  // gets the json dataof the page
  const pageData = getPageBySlug(slug);
  console.log(pageData);

  if (pageData) {
    // Navigate to the page URL
    const url =
      slug === "home"
        ? `https://tda-cmsv2.able.do/`
        : `https://tda-cmsv2.able.do/${slug}`;
    await page.goto(url);

    await page.waitForLoadState("networkidle");
    // get the text on the page
    const pageContent = await page.evaluate(() => document.body.textContent);

    // Check if there is any text content (excluding whitespace)
    if (pageContent.trim().length > 0) {
      console.log("Page has content");
    } else {
      console.log("Page has no content");
    }

    // Get the text content of the page
    const pageTextContent = await page.textContent("body");
    console.log(pageTextContent);

    expect(await page.title()).toBe(pageData.meta.title);
    console.log(await page.title());
    console.log(pageData.meta.title);
  }
});
