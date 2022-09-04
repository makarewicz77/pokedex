import {
  CircularProgress,
  Grid,
  Paper,
  styled,
  Typography,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, getCard } from "../../api/api-client";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  clearError,
  selectBattlePokemons,
} from "../../features/pokemon-battle-cards";
import ErrorSnackbar from "../../components/error-snackbar/error-snackbar";
import PokemonDetailsForm from "../../components/pokemon-details-form/pokemon-details-form";

/**
 * PokemonDetails component gets the cardId from the url params
 * to fetch selected card.
 */

const StyledMainContainer = styled(Grid)({
  margin: "24px",
});

const StyledPokemonDetailsHeader = styled(Typography)({
  margin: "24px 0",
});

const StyledPokemonDetailsPaper = styled(Paper)({
  padding: "24px",
});

const PokemonDetails: FC = () => {
  // states
  const { cardId } = useParams();
  const [card, setCard] = useState<Card | null>(null);
  const [loading, setLoading] = useState(true);

  // redux
  const { error } = useAppSelector(selectBattlePokemons);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (cardId != null && cardId.length > 0) {
      getCard(cardId)
        .then((card) => {
          setCard(card);
        })
        .catch((error) => {
          throw error;
        })
        .finally(() => setLoading(false));
    }
  }, [cardId]);

  if (card == null) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        paddingTop="96px"
      >
        {loading ? (
          <CircularProgress color="inherit" />
        ) : (
          <Typography variant="h4">Ooops... Something went wrong :(</Typography>
        )}
      </Grid>
    );
  }

  return (
    <StyledMainContainer>
      <Grid container justifyContent="center">
        <StyledPokemonDetailsHeader variant="h3">
          Pokemon Details
        </StyledPokemonDetailsHeader>
      </Grid>
      <StyledPokemonDetailsPaper variant="outlined">
        <PokemonDetailsForm card={card} />
      </StyledPokemonDetailsPaper>
      <ErrorSnackbar
        open={error}
        message={"Cannot add more than 2 pokemons to battle!"}
        onClose={() => {
          dispatch(clearError());
        }}
      />
    </StyledMainContainer>
  );
};

export default PokemonDetails;
