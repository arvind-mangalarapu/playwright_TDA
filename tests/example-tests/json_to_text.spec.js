const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright");

// Example JSON content
const jsonContent = {
  content: [
    {
      type: "h2",
      children: [
        { text: "It takes a " },
        { text: "team", bold: true },
        { text: " to move a truck." },
      ],
    },
    {
      children: [
        {
          text: "Simplify the process of transporting and delivering commercial trucks. No matter what you're moving, our team will get it from where it is to where it needs to go safely, efficiently and reliably.",
        },
      ],
    },
  ],
};

// Function to convert JSON content to plain text
function jsonToPlainText(content) {
  let plainText = "";

  // Check if content is defined and is an array
  if (content && Array.isArray(content.content)) {
    content.content.forEach((item) => {
      if (item.type === "h2" && item.children && Array.isArray(item.children)) {
        item.children.forEach((child) => {
          plainText += child.text || ""; // Handle cases where child.text might be undefined
        });
      } else if (item.children && Array.isArray(item.children)) {
        item.children.forEach((child) => {
          plainText += child.text || ""; // Handle cases where child.text might be undefined
        });
      }
      plainText += "\n\n"; // Add new lines for readability between sections
    });
  } else {
    console.error("Invalid content format or content is not defined.");
  }

  return plainText.trim(); // Trim to remove extra whitespace at the end
}

test.describe("Extract and Log Plain Text from JSON", () => {
  let browser;
  let context;
  let page;

  test.beforeAll(async () => {
    // Launch browser and create a new page context
    browser = await chromium.launch();
  });

  test.afterAll(async () => {
    // Close the browser after all tests
    await browser.close();
  });

  test.beforeEach(async () => {
    // Create a new browser context and page for each test
    context = await browser.newContext();
    page = await context.newPage();
  });

  test.afterEach(async () => {
    // Close the current page and context after each test
    await page.close();
    await context.close();
  });

  test("Should extract and log plain text from JSON content", async () => {
    // Extract plain text content
    const plainTextContent = jsonToPlainText(jsonContent);

    // Log the extracted plain text content
    console.log("Extracted Plain Text:");
    console.log(plainTextContent);

    // Perform assertions to validate the extracted plain text
    expect(plainTextContent).toContain("It takes a team");
    expect(plainTextContent).toContain("Simplify the process");

    // Example Playwright actions (optional)
    await page.goto("https://example.com");
    // Add more Playwright actions as needed within the test

    // Example assertion with Playwright
    const pageTitle = await page.title();
    expect(pageTitle).toContain("Example Domain");
  });
});
