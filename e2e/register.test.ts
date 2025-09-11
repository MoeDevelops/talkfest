import { test, expect } from "@playwright/test"

test("test", async ({ page }) => {
  await page.goto("http://localhost:4173/")
  await page.getByRole("link", { name: "Register" }).click()
  await page.locator('input[name="username"]').fill("TestUser")
  await page.locator('input[name="password"]').fill("TestPassword")
  await page.getByRole("button", { name: "Create Account" }).click()
  await expect(page.getByRole("heading")).toContainText("Welcome, TestUser")
})
