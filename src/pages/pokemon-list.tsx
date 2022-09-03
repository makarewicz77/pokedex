import { Alert, Grid, Snackbar } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card as PokemonCard, getCards } from "../api/api-client";

type PokemonListProps = {};

const PokemonList: FC<PokemonListProps> = () => {
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((error) => {
        setOpen(true);
        setMessage(error.message);
      });
  }, []);

  return (
    <Grid container>
      <h1>Pokemon List</h1>
      <Grid
        container
        spacing={{ xs: 3, md: 4, lg: 5 }}
        columns={{ xs: 4, sm: 8, md: 12, lg: 16, xl: 20 }}
        padding="0 24px"
      >
        {cards.map((card) => {
          return (
            <Grid item xs={4} sm={4} md={4} lg={4} xl={4} key={card.id}>
              <Link to={`/pokemon-details/${card.id}`}>
                <img
                  src={`${card.images.small}?wfit=crop&auto=format`}
                  alt={card.name}
                  style={{
                    width: "100%",
                    boxShadow: "4px 4px 8px 0px rgba(0, 0, 0, 0.4)",
                    borderRadius: "10px",
                  }}
                  loading="lazy"
                />
              </Link>
            </Grid>
          );
        })}
      </Grid>
      <Snackbar open={open} autoHideDuration={6000}>
        <Alert severity="error">{message}</Alert>
      </Snackbar>
    </Grid>
  );
};

export default PokemonList;
