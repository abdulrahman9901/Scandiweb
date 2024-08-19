import { expect, test } from "@playwright/test";
import { deleteProducts } from "./deleteProduct";

test.describe("XSS", () => {
  test("Add a product with XSS", async ({ page }) => {
    await deleteProducts(page);

    await page.goto("https://scandiweb-wine.vercel.app/");

    await page.getByRole("link", { name: "ADD" }).click();

    await expect(page.locator("#product_form")).toBeVisible({ timeout: 10000 });

    await page
      .locator("#sku")
      .fill('<h1 id="html_injection">HTML SKU Injection</h1>');
    await page
      .locator("#name")
      .fill('<h1 id="html_injection">HTML Name Injection</h1>');
    await page.locator("#price").fill("25");
    await page.locator("#productType").selectOption({ label: "DVD" });

    await expect(page.locator("#size")).toBeVisible({ timeout: 10000 });

    await page.locator("#size").fill("200");

    await page.getByRole("button", { name: "Save" }).click();

    await expect(page.getByText("Product List")).toBeVisible({
      timeout: 10000,
    });

    /***  MODIFICATION STARTS */
    // await expect(page.locator("#html_injection")).toBeVisible({
    //   timeout: 10000,
    // });

    await expect(page.locator("body")).toContainText(
      '<h1 id="html_injection">HTML SKU Injection</h1>'
    );

    /***  MODIFICATION ENDS */
    
    await deleteProducts(page);
  });
});
