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
import { InsertChart } from "@mui/icons-material";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { UserContext } from "@/pages/_app";
import Link from "next/link";
import { ProductionQuantityLimits } from "@mui/icons-material";
import { Inventory } from "@mui/icons-material";
import { Category } from "@mui/icons-material";
import { PeopleAlt } from "@mui/icons-material";
import { MeetingRoom } from "@mui/icons-material";
import { useRouter } from "next/router";
import { AdminOrderContext } from "./layout/AdminLayout";

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

function AdminNavbar(props) {
  const user = useContext(UserContext);
  const adminOrder = useContext(AdminOrderContext);

  const router = useRouter();
  const [search, setSearch] = React.useState(router.query?.q ?? "");
  const { window } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  function onUpdateSearch(value) {
    router.push({
      pathname: location.pathname,
      query: { ...router.query, q: value },
    });
  }

  React.useEffect(() => {
    setSearch(router.query?.q ?? "");
  }, [router]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

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

  const MenuList = [
    {
      label: "รายงานสถิติ",
      link: "/admin/report",
      element: (
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge color="error">
            <InsertChart />
          </Badge>
        </IconButton>
      ),
    },
    {
      label: "คำสั่งซื้อ",
      link: "/admin/order",
      element: (
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge
            badgeContent={
              [...adminOrder.value?.filter((order) => order.send_status === 0)]
                .length
            }
            color="error"
          >
            <ProductionQuantityLimits />
          </Badge>
        </IconButton>
      ),
    },
    {
      label: "สินค้า",
      link: "/admin/stock",
      element: (
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge color="error">
            <Inventory />
          </Badge>
        </IconButton>
      ),
    },
    {
      label: "หมวดหมู่",
      link: "/admin/category",
      element: (
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge color="error">
            <Category />
          </Badge>
        </IconButton>
      ),
    },
    {
      label: "สมาชิก",
      link: "/admin/member",
      element: (
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge color="error">
            <PeopleAlt />
          </Badge>
        </IconButton>
      ),
    },
    {
      label: "ย้อนกลับ",
      link: "/",
      element: (
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge color="error">
            <MeetingRoom />
          </Badge>
        </IconButton>
      ),
    },
  ];

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
            onClick={handleMenuClose}
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
      <AppBar position="fixed" style={{ backgroundColor: "black" }}>
        <Toolbar className="max-w-[1520px] 2xl:mx-auto 2xl:w-full box-border">
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Link href={"/"}>Admin</Link>
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={search}
              onChange={(e) => onUpdateSearch(e.target.value)}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {MenuList.map((menu, idx) => (
              <Link
                title={menu.label}
                className="text-white"
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
export default AdminNavbar;
