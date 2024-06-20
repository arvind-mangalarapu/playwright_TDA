const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

test("iterate through JSON data and check page content", async ({ page }) => {
  // Read JSON data
  const jsonFilePath = path.resolve(__dirname, "../../cms/data/tda/pages.json");

  let jsonData;
  try {
    jsonData = JSON.parse(fs.readFileSync(jsonFilePath, "utf8"));
  } catch (error) {
    console.error("Error reading or parsing JSON file:", error);
    return;
  }

  // Navigate to the webpage
  await page.goto("https://tda-cmsv2.able.do/");

  // Get all text content from the page
  const pageContent = await page.evaluate(() => document.body.innerText);

  // Iterate through JSON data and check if each item is present in the page content
  jsonData.forEach((item, index) => {
    // Handle both string and object with 'text' property
    let text;
    if (typeof item === "string") {
      text = item;
    } else if (typeof item === "object" && item !== null && item.text) {
      text = item.text;
    } else {
      console.warn(
        `Item at index ${index} is neither a string nor an object with a 'text' property:`,
        item
      );
      return;
    }

    if (pageContent.includes(text)) {
      console.log(`Content found: "${text}"`);
    }
  });
});
