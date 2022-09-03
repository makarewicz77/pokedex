import { Grid } from "@mui/material";
import React, { FC } from "react";
import { useParams } from "react-router-dom";

type PokemonDetailsProps = {};

const PokemonDetails: FC<PokemonDetailsProps> = () => {
  const { cardId } = useParams();
  return (
    <Grid>
      <h1>Pokemon {cardId} Details</h1>
    </Grid>
  );
};

export default PokemonDetails;
