import * as React from "react";
import { useContext } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import {
  CartContext,
  OrderContext,
  UserContext,
  WishlistContext,
} from "@/pages/_app";
import Link from "next/link";
import { Favorite } from "@mui/icons-material";
import { Logout, SupervisedUserCircle } from "@mui/icons-material";
import { useRouter } from "next/router";
import { Cottage } from "@mui/icons-material";
import { Store } from "@mui/icons-material";
import { ShoppingBag } from "@mui/icons-material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function Navbar(props) {
  const router = useRouter();
  const [search, setSearch] = React.useState(router.query?.q ?? "");
  const wishlist = useContext(WishlistContext);
  const cart = useContext(CartContext);

  const user = useContext(UserContext);
  const order = useContext(OrderContext);
  const { window } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  function onUpdateSearch(value) {
    let query = router.query;
    if (value) {
      query.q = value;
    } else {
      delete query.q;
    }
    router.push({
      pathname: location.pathname,
      query: { ...query },
    });
  }

  React.useEffect(() => {
    setSearch(router.query?.q ?? "");
    console.log(router.query);
  }, [router]);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const MenuList = user?.value?.name
    ? [
        {
          label: "หน้าหลัก",
          link: "/",
          element: (
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge color="error">
                <Store />
              </Badge>
            </IconButton>
          ),
        },
        {
          label: "สินค้าที่ชอบ",
          link: "/wishlist",
          element: (
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={wishlist.value.length} color="error">
                <Favorite />
              </Badge>
            </IconButton>
          ),
        },
        {
          label: "ตระกร้า",
          link: "/cart",
          element: (
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={cart.value.length} color="error">
                <ShoppingCart />
              </Badge>
            </IconButton>
          ),
        },
        {
          label: "คำสั่งซื้อ",
          link: "/order",
          element: (
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge
                badgeContent={
                  [...order.value.filter((od) => od.pay_status === 0)].length
                }
                color="error"
              >
                <ShoppingBag />
              </Badge>
            </IconButton>
          ),
        },
        {
          label: user.value.name,
          link: "/profile",
          element: (
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          ),
        },
        {
          label: "ออกจากระบบ",
          link: "/logout",
          element: (
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge color="error">
                <Logout />
              </Badge>
            </IconButton>
          ),
        },
      ]
    : [
        {
          label: "",
          element: (
            <span className="inline-block mx-3 p-3 hover:underline">
              เข้าสู่ระบบ
            </span>
          ),
          link: "/login",
        },

        {
          label: "",
          element: (
            <span className="inline-block mx-3 p-3 hover:underline">
              สมัครสมาชิก
            </span>
          ),
          link: "/register",
        },
      ];

  if (user.value.rank) {
    MenuList.unshift({
      label: "admin",
      link: "/admin/report",
      element: (
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge color="error">
            <SupervisedUserCircle />
          </Badge>
        </IconButton>
      ),
    });
  }
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {MenuList.map((menu, idx) => (
        <span key={idx}>
          <Link
            onClick={handleMobileMenuClose}
            className="text-black no-underline"
            href={menu.link}
          >
            <MenuItem>
              {menu.element}
              <p>{menu.label}</p>
            </MenuItem>
          </Link>
        </span>
      ))}
    </Menu>
  );

  return (
    <>
      <AppBar
        className="shadow-sm bg-white/90"
        color="inherit"
        position="fixed"
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { md: "block" } }}
          >
            <Link
              className="bg-black rounded-lg inline-block px-2 sm:p-4 sm:py-2"
              href={"/"}
            >
              OpenShop
            </Link>
          </Typography>
          <Search sx={{ width: 150 }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              className="hover:border border-gray-300 hover:border-solid rounded duration-200"
              placeholder="ค้นหา…"
              inputProps={{ "aria-label": "search" }}
              value={search}
              onChange={(e) => {
                return onUpdateSearch(e.target.value);
              }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            className="rounded-lg"
            sx={{
              display: { xs: "none", md: "flex", backgroundColor: "black" },
            }}
          >
            {MenuList.map((menu, idx) => (
              <Link
                title={menu.label}
                className={`text-white duration-200 ${
                  router.pathname === menu.link ? " -translate-y-1" : ""
                }`}
                key={idx}
                href={menu.link}
              >
                <span>{menu.element}</span>
              </Link>
            ))}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </>
  );
}

// Navbar.PropTypes = {
//   window: PropTypes.func,
// };
export default Navbar;
