import React from "react";
import Product from "../product/product";

import Grid from "@mui/material/Grid";

import Box from "@mui/material/Box";

const ProductList = () => {
  return (
    <article>
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Product title={"Product 1"}></Product>
          <Product title={"Product 2"}></Product>
        </Grid>
      </Box>
    </article>
  );
};

export default ProductList;
