import styled from "@emotion/styled";
import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { FC, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Card } from "../../api/api-client";
import { addPokemonToBattle } from "../../features/pokemon-battle-cards";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import { useAppDispatch } from "../../app/hooks";

/**
 * Form allows to edit health, name and attack damages for each attack.
 * If an attack damage is not convertable to int - the input is disabled
 * and we can't edit the damage.
 */

type PokemonDetailsFormProps = {
  card: Card;
};

type PokemonDetailsFormFields = {
  hp: number;
  name: string;
  attack: { damage: number }[];
};

const StyledAttackIcon = styled(BoltOutlinedIcon)({
  marginRight: "12px",
});

const StyledAddToBattleButton = styled(Button)({
  margin: "24px 0 0",
});

const StyledTextField = styled(TextField)(() => ({
  marginBottom: "16px",
}));

const StyledImage = styled("img")({
  width: "100%",
  maxWidth: "400px",
  boxShadow: "4px 4px 8px 0px rgba(0, 0, 0, 0.4)",
  borderRadius: "24px",
});

const PokemonDetailsForm: FC<PokemonDetailsFormProps> = ({ card }) => {
  const dispatch = useAppDispatch();

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
    if (card != null) {
      dispatch(
        addPokemonToBattle({
          ...card,
          hp: pokemonDetails.hp.toString(),
          name: pokemonDetails.name,
          attacks: card?.attacks?.map((att, idx) => ({
            ...att,
            damage: pokemonDetails.attack[idx].damage.toString(),
          })),
        })
      );
    }
  };

  useEffect(() => {
    reset({ hp: Number(card.hp), name: card.name });
    card.attacks?.forEach((attack) => {
      append({ damage: parseInt(attack.damage) });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card]);

  return (
    <form
      onSubmit={handleSubmit(handlePokemonDetailsSave)}
      name="pokemon-details"
    >
      <Grid container spacing={2} columns={{ xs: 1, sm: 2 }}>
        <Grid item xs={0} sm={1}>
          <Grid container justifyContent="center" alignItems="center">
            <StyledImage
              src={`${card.images.large}?wfit=crop&auto=format`}
              alt={card.name}
              loading="lazy"
            />
          </Grid>
        </Grid>
        <Grid item xs={0} sm={1}>
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
                <StyledAttackIcon />
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
                    disabled={
                      card.attacks?.[index].damage === "" ||
                      card.attacks?.[index].damage == null
                    }
                    label="Damage"
                    InputLabelProps={{ shrink: true }}
                    inputMode="numeric"
                    type="number"
                    fullWidth
                    {...register(`attack.${index}.damage`)}
                  />
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid container justifyContent="center">
        <StyledAddToBattleButton type="submit" variant="contained">
          Add {card.name} to battle!
        </StyledAddToBattleButton>
      </Grid>
    </form>
  );
};

export default PokemonDetailsForm;
