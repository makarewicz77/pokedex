import styled from "@emotion/styled";
import {
  CircularProgress,
  Grid,
  Pagination,
  TablePagination,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card as PokemonCard, getCards } from "../../api/api-client";
import ErrorSnackbar from "../../components/error-snackbar/error-snackbar";

/**
 * PokemonList component returns a list of pokemons with pagination.
 * It also allows a user to click the pokemon card to view it's details.
 */

const useStyles = makeStyles({
  tablePaginationStyle: {
    "& > div": {
      flexWrap: "wrap",
    },
  },
});

const StyledImage = styled("img")({
  width: "100%",
  boxShadow: "4px 4px 8px 0px rgba(0, 0, 0, 0.4)",
  borderRadius: "24px",
});

const PokemonList: FC = () => {
  // states
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [errorSnackbarState, setErrorSnackbarState] = useState({
    open: false,
    message: "",
  });
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  // pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    getCards({
      page: currentPage,
      pageSize,
      orderBy: "name",
      // Query to filter only pokemons
      q: "supertype:Pokémon",
    })
      .then(({ cards, totalCount }) => {
        setCards(cards);
        setTotalCount(totalCount);
      })
      .catch((error) => {
        setErrorSnackbarState({ open: true, message: error.message });
      })
      .finally(() => setLoading(false));
  }, [currentPage, pageSize]);

  return loading ? (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      paddingTop="96px"
    >
      <CircularProgress color="inherit" />
    </Grid>
  ) : (
    <Grid container>
      <Grid container justifyContent="center">
        <Typography variant="h3" margin="24px 0">
          Pokemon List
        </Typography>
      </Grid>
      <Grid
        container
        spacing={{ xs: 3, md: 4, lg: 5 }}
        columns={{ xs: 4, sm: 8, md: 12, lg: 16, xl: 20 }}
        padding="0 24px"
        justifyContent="center"
      >
        {cards.map((card) => {
          return (
            <Grid item xs={4} sm={4} md={4} lg={4} xl={4} key={card.id}>
              <Link to={`/pokemon-details/${card.id}`}>
                <StyledImage
                  src={`${card.images.small}?wfit=crop&auto=format`}
                  alt={card.name}
                  loading="lazy"
                />
              </Link>
            </Grid>
          );
        })}
      </Grid>
      <Grid container justifyContent="center" margin="32px 0 24px">
        <Pagination
          count={Math.ceil(totalCount / pageSize)}
          boundaryCount={5}
          siblingCount={5}
          page={currentPage}
          onChange={(e, newPage) => {
            setCurrentPage(newPage);
          }}
          variant="outlined"
          shape="rounded"
          hideNextButton
          hidePrevButton
        />
        <TablePagination
          component="div"
          count={totalCount}
          page={currentPage - 1}
          onPageChange={(e, newPage) => setCurrentPage(newPage + 1)}
          rowsPerPage={pageSize}
          onRowsPerPageChange={(e) => {
            setPageSize(Number(e.target.value));
            setCurrentPage(1);
          }}
          classes={{ root: classes.tablePaginationStyle }}
        />
      </Grid>
      <ErrorSnackbar
        open={errorSnackbarState.open}
        message={errorSnackbarState.message}
        onClose={() => {
          setErrorSnackbarState({ open: false, message: "" });
        }}
      />
    </Grid>
  );
};

export default PokemonList;
