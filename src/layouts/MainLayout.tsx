import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import * as React from "react";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/store.ts";
import MainListItems from "../components/dashboard/MainListItems.tsx";
import {
  ChevronLeftIcon,
  LocalGroceryStoreOutlinedIcon,
  LogoutOutlinedIcon,
  MenuIcon,
} from "../components/icons/index.ts";
import { clearAuth } from "../features/auth/authSlice.tsx";
type MainLayoutProps = {
  children: ReactNode;
};

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const defaultTheme = createTheme();
export const MainLayout = ({ children }: MainLayoutProps) => {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <Grid2>
      {/* <SidebarProyect/> */}
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: "24px",
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1, cursor: "pointer" }}
                onClick={() => navigate("/")}
              >
                Club Lapacho Tenis de Mesa
              </Typography>
              <IconButton
                color="inherit"
                onClick={() => navigate("cajaCarrito")}
              >
                <LocalGroceryStoreOutlinedIcon />
              </IconButton>

              <IconButton color="inherit" onClick={() => dispatch(clearAuth())}>
                <LogoutOutlinedIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              <MainListItems />
            </List>
          </Drawer>
          {children}
        </Box>
      </ThemeProvider>
    </Grid2>
  );
};

export default MainLayout;
