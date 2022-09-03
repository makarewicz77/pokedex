import {
  Button,
  Grid,
  Paper,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import React, { FC, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Card, getCard } from "../api/api-client";

/**
 * PokemonDetails component gets the cardId from the url params
 * to fetch selected card. Form allows to edit health, name and
 * attack damages for each attack.
 */

type PokemonDetailsFormFields = {
  hp: number;
  name: string;
  attack: { [key: string]: string }[];
};

const StyledTextField = styled(TextField)(() => ({
  marginBottom: "16px",
}));

const PokemonDetails: FC = () => {
  // states
  const { cardId } = useParams();
  const [card, setCard] = useState<Card | null>(null);

  // form hook and functions
  const { handleSubmit, watch, setValue, reset, control, register } =
    useForm<PokemonDetailsFormFields>({
      defaultValues: {
        hp: card?.hp != null ? Number(card.hp) : 0,
        name: card?.name ?? "",
      },
    });
  const { fields, append } = useFieldArray({
    control,
    name: "attack",
  });

  const handlePokemonDetailsSave = (
    pokemonDetails: PokemonDetailsFormFields
  ) => {
    console.log({ pokemonDetails });
  };

  useEffect(() => {
    if (cardId != null && cardId.length > 0) {
      getCard(cardId)
        .then((card) => {
          setCard(card);
          reset({ hp: Number(card.hp), name: card.name });
          card.attacks?.forEach((attack) => {
            append({ [attack.name]: attack.damage });
          });
        })
        .catch((error) => {
          throw error;
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardId]);

  if (card == null) {
    return (
      <Typography variant="caption">Ooops... Something went wrong.</Typography>
    );
  }

  return (
    <Grid margin="24px">
      <Typography variant="h3" margin="24px 0">
        Pokemon Details
      </Typography>
      <Paper style={{ padding: "24px" }} variant="outlined">
        <form
          onSubmit={handleSubmit(handlePokemonDetailsSave)}
          name="pokemon-details"
        >
          <Grid container spacing={2} columns={16}>
            <Grid item xs={8}>
              <Grid container justifyContent="center" alignItems="center">
                <img
                  src={`${card.images.large}?wfit=crop&auto=format`}
                  alt={card.name}
                  style={{
                    width: "100%",
                    maxWidth: "500px",
                    boxShadow: "4px 4px 8px 0px rgba(0, 0, 0, 0.4)",
                    borderRadius: "24px",
                  }}
                  loading="lazy"
                />
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <StyledTextField
                name="name"
                label="Name"
                value={watch("name")}
                onChange={(e) => setValue("name", e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
              <StyledTextField
                name="hp"
                label="HP"
                value={watch("hp")}
                onChange={(e) => setValue("hp", Number(e.target.value))}
                InputLabelProps={{ shrink: true }}
                inputMode="numeric"
                type="number"
                fullWidth
              />
              <Typography variant="h4">Attacks</Typography>
              {fields.map((field, index) => (
                <Grid key={field.id} margin="12px 0">
                  <Grid container alignItems="center" marginBottom="16px">
                    <BoltOutlinedIcon style={{ marginRight: "12px" }} />
                    <Typography variant="h5">
                      {card.attacks?.[index].name}
                    </Typography>
                  </Grid>
                  <Grid marginLeft="36px">
                    <Typography variant="body1">
                      {card.attacks?.[index].text}
                    </Typography>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      marginTop="12px"
                      columns={12}
                    >
                      <Grid item xs={2}>
                        <Typography variant="body1">Cost:</Typography>
                      </Grid>
                      <Grid item xs={10}>
                        <Typography variant="body2">
                          [{"\t"}
                          {card.attacks?.[index].cost.join("\t|\t")}
                          {"\t"}]
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      marginTop="12px"
                    >
                      <TextField
                        label="Damage"
                        InputLabelProps={{ shrink: true }}
                        inputMode="numeric"
                        type="number"
                        fullWidth
                        {...register(
                          `attack.${index}.${card.attacks?.[index].name}`
                        )}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid container justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              style={{ margin: "24px 0 0" }}
            >
              Save new statistics
            </Button>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
};

export default PokemonDetails;
