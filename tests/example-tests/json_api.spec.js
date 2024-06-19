import { test, expect } from "@playwright/test";

test("API request", async ({ request }) => {
  const response = await request.get("https://reqres.in/api/users/2");

  // Check that the status code is 200
  expect(response.status()).toBe(200);

  // Parse the response as JSON
  const jsonResponse = await response.json();

  // Check the contents of the response
  expect(jsonResponse.data).toBeDefined();
  expect(jsonResponse.data.id).toBe(2);
  expect(jsonResponse.data.email).toBe("janet.weaver@reqres.in");
  expect(jsonResponse.data.first_name).toBe("Janet");
  expect(jsonResponse.data.last_name).toBe("Weaver");
  expect(jsonResponse.data.avatar).toBe(
    "https://reqres.in/img/faces/2-image.jpg"
  );

  // Optionally check support information
  expect(jsonResponse.support).toBeDefined();
  expect(jsonResponse.support.url).toBe("https://reqres.in/#support-heading");
  expect(jsonResponse.support.text).toBe(
    "To keep ReqRes free, contributions towards server costs are appreciated!"
  );

  // Optionally log the response
  console.log(jsonResponse);
});
