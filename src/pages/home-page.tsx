import { Grid, Typography } from "@mui/material";
import React, { FC } from "react";

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => (
  <Grid container justifyContent="center" marginTop={4}>
    <Typography variant="h3">Welcome in POKEDEX!</Typography>
  </Grid>
);

export default HomePage;
