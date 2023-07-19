import puppeteer from "puppeteer";

export const getProducts = async (q) => {
  if (!q) {
    return [];
  }

  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto(`https://www.globus.de/produkte/search?query=${q}`, {
    timeout: 60000,
    waitUntil: "networkidle0",
  });

  const products = await page.evaluate(() => {
    const productList = document.querySelectorAll(".product--box");
    console.log("foo", productList);

    return Array.from(productList).map((quote) => {
      const brand = quote.querySelector(".product--subtitle").innerText;
      const title = quote.querySelector(".product--title").innerText;
      const price = quote.querySelector(".product--price").innerText;

      return { brand, title, price };
    });
  });

  await browser.close();

  return products;
};
