import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ProductCard from "./components/ProductCard";
import { useEffect, useState } from "react";
import type { Products } from "../types/products";
import { BASE_URL } from "../constants/baseUrl";
import { Box } from "@mui/material";
const HomePage = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/products`);
        const data = await response.json();
        setProducts(data);
      } catch {
        setError(true);
      }
    };
    fetchData();
  }, []);
  if (error) {
    return <Box>Something Went Wrong</Box>;
  }
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        {products.map((p) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <ProductCard {...p}></ProductCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
// grid api first has problem that 4 is constant even in small screens
// container has problem of max width 1200 letting too much space find away to make cleaner
export default HomePage;
