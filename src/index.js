import express from "express";
import { getProducts } from "./scraper/index.js";

const app = express();
const port = 3000;

app.get("/getProducts", async (req, res) => {
  const products = await getProducts(req.query?.q);

  res.send(products);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
