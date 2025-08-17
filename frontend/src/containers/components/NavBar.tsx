import AdbIcon from "@mui/icons-material/Adb";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button, Grid } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth/AuthContext";

function ResponsiveAppBar() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogin = () => {
    navigate("/login");
  };
  const handleLogout = () => {
    auth?.logout();
    navigate("/");
    handleCloseUserMenu();
  };
  const handleCart = () => {
    navigate("/cart");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <AdbIcon sx={{ display: "flex", mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "inherit",
                }}
              >
                Techub
              </Typography>
            </Box>
            {auth?.isAuth ? (
              <>
                <Box sx={{}}>
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="center"
                    gap={2}
                  >
                    <IconButton aria-label="cart" onClick={handleCart}>
                      <Badge badgeContent={4} color="secondary">
                        <ShoppingCartIcon sx={{ color: "#FFFFFF" }} />
                      </Badge>
                    </IconButton>

                    <Typography>{auth?.username}</Typography>

                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                          alt={auth?.username || ""}
                          src="/static/images/avatar/2.jpg"
                        />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography sx={{ textAlign: "center" }}>
                        My Orders
                      </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <Typography sx={{ textAlign: "center" }}>
                        Logout
                      </Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </>
            ) : (
              <>
                <Box sx={{}}>
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="center"
                    gap={2}
                  >
                    <IconButton aria-label="cart" onClick={handleCart}>
                      <Badge badgeContent={4} color="secondary">
                        <ShoppingCartIcon sx={{ color: "#FFFFFF" }} />
                      </Badge>
                    </IconButton>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleLogin}
                    >
                      Login
                    </Button>
                  </Grid>
                </Box>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
