const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../../cms/data/tda/pages.json");

const rawData = fs.readFileSync(dataPath, "utf8");
const testData = JSON.parse(rawData);

const getPageBySlug = (slug) => testData.find((page) => page.slug === slug);

const slug = "home";
test("check page title", async ({}) => {


  
  const pageDetails = getPageBySlug(slug);

  if (pageDetails) {
    console.log(`JSON content for slug '${slug}':`, pageDetails);
  } else {
    throw new Error(`Page with slug '${slug}' not found in JSON data`);
  }
});
