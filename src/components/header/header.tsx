import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Grid,
  styled,
} from "@mui/material";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import BattleInfo from "../battle-info/battle-info";

const StyledAppBar = styled(AppBar)(() => ({
  height: "70px",
}));

const StyledLink = styled(Link)(
  ({ textColor = "white" }: { textColor?: "white" | "black" }) => ({
    textDecoration: "none",
    color: textColor === "white" ? "#fff" : "#000",
  })
);

const StyledMainHeaderText = styled(Typography)({
  fontFamily: "monospace",
  fontWeight: 700,
  letterSpacing: ".3rem",
  color: "inherit",
  textDecoration: "none",
});

const StyledPageButton = styled(Button)({ color: "white", display: "block" });

// Object defining pages for future development
const PAGES = {
  POKEMON_LIST: "Pokemon List",
};

const getLinkByPage = (page: string) => {
  switch (page) {
    case PAGES.POKEMON_LIST:
      return "/pokemon-list";
    default:
      return "/";
  }
};

const Header: FC = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <StyledAppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* HEADER MENU FOR SMALL SCREENS */}
          <StyledLink to="/">
            <StyledMainHeaderText
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
              }}
            >
              POKEDEX
            </StyledMainHeaderText>
          </StyledLink>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              Menu
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {Object.values(PAGES).map((page) => (
                <StyledLink
                  to={getLinkByPage(page)}
                  key={page}
                  textColor="black"
                >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                </StyledLink>
              ))}
            </Menu>
          </Box>

          {/* DEFAULT HEADER */}
          <StyledLink to="/">
            <StyledMainHeaderText
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
              }}
            >
              POKEDEX
            </StyledMainHeaderText>
          </StyledLink>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            <Grid container columns={4}>
              <Grid item xs={1}>
                {Object.values(PAGES).map((page) => (
                  <StyledLink to={getLinkByPage(page)} key={page}>
                    <StyledPageButton
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2 }}
                    >
                      {page}
                    </StyledPageButton>
                  </StyledLink>
                ))}
              </Grid>
              <Grid item display="flex" xs={3}>
                <BattleInfo />
              </Grid>
            </Grid>
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Header;
