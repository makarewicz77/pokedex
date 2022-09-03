import { css } from "@emotion/css";
import {
  Alert,
  Button,
  Grid,
  Pagination,
  Snackbar,
  TablePagination,
  Typography,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card as PokemonCard, getCards } from "../api/api-client";

type PokemonListProps = {};

const TablePaginationStyle = css`
  & > div {
    flex-wrap: wrap;
  }
`;

const PokemonList: FC<PokemonListProps> = () => {
  // states
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");

  // pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    getCards({
      page: currentPage,
      pageSize,
      orderBy: "name",
      q: "supertype:Pokémon",
    })
      .then(({ cards, totalCount }) => {
        setCards(cards);
        setTotalCount(totalCount);
      })
      .catch((error) => {
        setErrorSnackbarOpen(true);
        setMessage(error.message);
      });
  }, [currentPage, pageSize]);

  return (
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
          onPageChange={(e, newPage) => setCurrentPage(newPage)}
          rowsPerPage={pageSize}
          onRowsPerPageChange={(e) => {
            setPageSize(Number(e.target.value));
            setCurrentPage(1);
          }}
          className={TablePaginationStyle}
        />
      </Grid>
      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={5000}
        onClose={() => setErrorSnackbarOpen(false)}
        style={{ width: "100%", justifyContent: "center" }}
      >
        <Alert severity="error" style={{ alignItems: "center" }}>
          {message}
          <Button onClick={() => setErrorSnackbarOpen(false)}>Close</Button>
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default PokemonList;
