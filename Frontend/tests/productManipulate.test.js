import {expect, test } from "@playwright/test";
import { deleteProducts } from "./deleteProduct";

test.describe("Product manipulation", () => {
  test("Remove and add different products", async ({ page }) => {
    await page.goto("https://scandiweb-wine.vercel.app/", { timeout: 10000 });

    // wait to ensure checkboxes are visible
    // Introducing a delay of 5 seconds (2000 milliseconds) to make sure page loaded 

    /***  MODIFICATION STARTS */
    await page.waitForTimeout(5000);
    /***  MODIFICATION ENDS */

    const checkboxes = await page.locator('input[type="checkbox"]').all();
    console.log("Checkboxes found:", checkboxes.length);

    if (checkboxes.length > 0) {
      await deleteProducts(page);
    }

    const updatedCheckboxes = await page
      .locator('input[type="checkbox"]')
      .all();
    expect(updatedCheckboxes).toHaveLength(0);

    await page.getByText("ADD").click();

    await expect(page.locator("#product_form")).toBeVisible({ timeout: 10000 });

    await page.locator("#sku").fill("SKUTest000");
    await page.locator("#name").fill("NameTest000");
    await page.locator("#price").fill("25");
    await page.locator("#productType").selectOption({ label: "DVD" });

    await expect(page.locator("#size")).toBeVisible();
    await page.locator("#size").fill("200");
    await page.getByText("Save").click();

    await expect(page.getByText("Product List")).toBeVisible({
      timeout: 10000,
    });
    await expect(page.getByText("NameTest000")).toBeVisible({ timeout: 10000 });

    await deleteProducts(page);

    await page.getByText("ADD").click();

    await expect(page.locator("#product_form")).toBeVisible({ timeout: 10000 });

    await page.locator("#sku").fill("SKUTest000");
    await page.locator("#name").fill("NameTest000");
    await page.locator("#price").fill("25");
    await page.locator("#productType").selectOption({ label: "Book" });

    await expect(page.locator("#weight")).toBeVisible();
    await page.locator("#weight").fill("200");
    await page.getByText("Save").click();

    await expect(page.getByText("Product List")).toBeVisible({
      timeout: 10000,
    });
    await expect(page.getByText("NameTest000")).toBeVisible({ timeout: 10000 });

    await deleteProducts(page);

    await page.getByText("ADD").click();

    await expect(page.locator("#product_form")).toBeVisible({ timeout: 10000 });

    await page.locator("#sku").fill("SKUTest000");
    await page.locator("#name").fill("NameTest000");
    await page.locator("#price").fill("25");
    await page.locator("#productType").selectOption({ label: "Furniture" });

    await expect(page.locator("#height")).toBeVisible();
    await expect(page.locator("#width")).toBeVisible();
    await expect(page.locator("#length")).toBeVisible();

    await page.locator("#height").fill("200");
    await page.locator("#width").fill("200");
    await page.locator("#length").fill("200");
    await page.getByText("Save").click();

    await expect(page.getByText("Product List")).toBeVisible({
      timeout: 10000,
    });
    await expect(page.getByText("NameTest000")).toBeVisible({ timeout: 10000 });

    await deleteProducts(page);
  });

  test("add product with invalid input", async ({ page }) => {
    await page.goto("https://scandiweb-wine.vercel.app/");

    await page.getByText("ADD").click();

    await expect(page.locator("#product_form")).toBeVisible({ timeout: 10000 });

    await page.locator("#sku").fill("SKUTest000");
    await page.locator("#name").fill("NameTest000");
    await page.locator("#price").fill("25");
    await page.locator("#productType").selectOption({ label: "Furniture" });

    await expect(page.locator("#height")).toBeVisible();
    await expect(page.locator("#width")).toBeVisible();
    await expect(page.locator("#length")).toBeVisible();

    // populating only one out of the three required fields
    await page.locator("#height").fill("200");
    await page.getByText("Save").click();

    await expect(page.getByText("Product List")).toBeHidden({ timeout: 10000 });

    await deleteProducts(page);
  });
});
