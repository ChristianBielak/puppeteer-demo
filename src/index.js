import express from "express";
import { getProducts } from "./scraper/index.js";
import cors from "cors";

const app = express();
const port = 3000;
app.use(cors());

app.get("/getProducts", async (req, res) => {
  const products = await getProducts(req.query?.q);

  res.send(products);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
