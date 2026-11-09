import { test, expect } from "@playwright/test";

test.describe("Promleeblog.com Primary User Journeys", () => {
  // @feature homepage
  test("should navigate from the homepage to a blog post", async ({
    page,
  }) => {
    // Navigate to the homepage
    await page.goto("/");

    // Wait for the main content to be visible, specifically looking for carousels
    // There are two carousels, one for recent and one for hot posts. We'll target the first one.
    const carousel = page.locator(".embla").first();
    await expect(carousel).toBeVisible();

    // Find the first visible blog post link within the carousel
    const firstPostLink = carousel.getByRole("link", {
      name: /.*/,
    });
    await expect(firstPostLink.first()).toBeVisible();

    // Get the title of the post to verify on the next page
    const postTitle = await firstPostLink.first().textContent();
    expect(postTitle).toBeTruthy();

    // Click on the post link
    await firstPostLink.first().click();

    // Verify the URL has changed to a blog post page
    await expect(page).toHaveURL(/\/blog\/post\/.+/);

    // Verify the post title is displayed as the main heading on the post page
    const mainHeading = page.getByRole("heading", { level: 1 });
    await expect(mainHeading).toHaveText(postTitle!);
  });

  // @feature blog
  test("should navigate through blog categories to a post", async ({
    page,
  }) => {
    // Start at the main blog page which lists all categories
    await page.goto("/blog");

    // Verify the main heading is "All Categories"
    await expect(
      page.getByRole("heading", { name: "All Categories", level: 1 }),
    ).toBeVisible();

    // Find and click the first category link
    const firstCategoryLink = page.locator('a[href^="/blog/"]').first();
    const categoryName = await firstCategoryLink.textContent();
    expect(categoryName).toBeTruthy();
    await firstCategoryLink.click();

    // Verify navigation to the category page
    await expect(page).toHaveURL(new RegExp(`/blog/${categoryName!.trim()}`));
    // The category name is displayed in a div with class 'category'
    await expect(page.locator(".category")).toHaveText(categoryName!);

    // Find and click the first subject link on the category page
    const firstSubjectLink = page.locator('a.subject[href*="/blog/"]').first();
    await expect(firstSubjectLink).toBeVisible();
    const subjectName = await firstSubjectLink.textContent();
    expect(subjectName).toBeTruthy();
    await firstSubjectLink.click();

    // Verify navigation to the subject page
    await expect(page).toHaveURL(new RegExp(`/blog/.+/${subjectName!.trim()}`));
    // The subject name is displayed in a div with class 'subject'
    await expect(page.locator(".subject")).toHaveText(subjectName!);

    // Find and click the first post link on the subject page
    const firstPostLink = page.locator('a[href^="/blog/post/"]').first();
    await expect(firstPostLink).toBeVisible();
    await firstPostLink.click();

    // Verify the final navigation to a post page
    await expect(page).toHaveURL(/\/blog\/post\/.+/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  // @feature aboutme
  test("should display the About Me page with key sections", async ({
    page,
  }) => {
    // Navigate to the "About Me" page
    await page.goto("/aboutme");

    // The 'aboutme' page is a slide show. We will verify the presence of key sections
    // that are expected to be visible on load or within the presentation.

    // Verify the "About Me" section heading is visible
    await expect(
      page.getByRole("heading", { name: "About Me", level: 1 }),
    ).toBeVisible();
    await expect(
      page.getByText("도전을 두려워 않는 개발자"),
    ).toBeVisible();

    // Verify the "Contact & Channels" section is present
    await expect(
      page.getByRole("heading", { name: "Contact & Channels", level: 2 }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Github" })).toBeVisible();

    // Verify the "Education" section is present
    await expect(
      page.getByRole("heading", { name: "Education", level: 1 }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "한국외국어대학교" }),
    ).toBeVisible();
  });

  // @feature sitemap-tree
  test("should display the sitemap tree visualization", async ({ page }) => {
    // Navigate to the sitemap tree page
    await page.goto("/sitemap-tree");

    // The core of this page is a Cytoscape graph, which renders onto a canvas.
    // We can verify that the canvas element is visible, indicating the graph has been initialized.
    const cytoscapeCanvas = page.locator("canvas");

    // Wait for the canvas to be visible and ensure it has a non-zero size
    await expect(cytoscapeCanvas).toBeVisible();
    const canvasBoundingBox = await cytoscapeCanvas.boundingBox();
    expect(canvasBoundingBox).not.toBeNull();
    expect(canvasBoundingBox!.width).toBeGreaterThan(0);
    expect(canvasBoundingBox!.height).toBeGreaterThan(0);
  });
});