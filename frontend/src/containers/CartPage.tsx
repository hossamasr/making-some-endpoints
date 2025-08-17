import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../Auth/AuthContext";

const CartPage = () => {
  const auth = useAuth();
  const [cart, setCart] = useState();
  const [error, setError] = useState("");
  useEffect(() => {
    if (!auth?.token) {
      return;
    }
    const fetchCart = async () => {
      const response = await fetch(`${BASE_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      if (!response.ok) {
        setError("failed to fetch cart for user");
      }
      const data = await response.json();
      setCart(data);
    };
    fetchCart();
  }, [auth?.token]);
  console.log({ cart });
  return (
    <Container>
      <Typography variant="h4">My Cart</Typography>
    </Container>
  );
};

export default CartPage;
