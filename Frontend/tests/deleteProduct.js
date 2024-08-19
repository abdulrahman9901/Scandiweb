import { expect } from "@playwright/test";

export async function deleteProducts(page) {
  try {
    await page.goto("https://scandiweb-wine.vercel.app/");

    /***  MODIFICATION STARTS */
    // wait to ensure checkboxes are visible
    await page.locator('input[type="checkbox"]').first().waitFor({
      state: "visible",
      timeout: 10000,
    });
    /***  MODIFICATION ENDS */
    const isProductPresent = await page
      .locator('input[type="checkbox"]')
      .first()
      .isVisible({ timeout: 10000 });

    if (!isProductPresent) {
      console.log("No products found.");
      return;
    }

    // Wait for the checkboxes to be visible
    await page.waitForSelector('input[type="checkbox"]', {
      state: "visible",
      timeout: 10000,
    });

    // Get all checkboxes and log their count
    const checkboxes = await page.locator('input[type="checkbox"]').all();
    console.log("Number of checkboxes found:", checkboxes.length);

    if (checkboxes.length === 0) {
      console.log("No checkboxes to select.");
      return;
    }

    // Check all checkboxes
    for (const checkbox of checkboxes) {
      await checkbox.check();
    }

    // Click the "MASS DELETE" button
    await page.getByText("MASS DELETE").click();

    // Verify that checkboxes are hidden
    await expect(page.locator('input[type="checkbox"]').first()).toBeHidden({
      timeout: 10000,
    });

    console.log("Products deleted successfully.");
  } catch (error) {
    console.error("An error occurred during the delete operation:", error);
  }
}
