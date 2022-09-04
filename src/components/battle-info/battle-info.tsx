import styled from "@emotion/styled";
import { Button, Grid, Typography } from "@mui/material";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  removePokemonFromBattle,
  selectBattlePokemons,
} from "../../features/pokemon-battle-cards";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const Space = styled(Grid)(() => ({
  margin: "0 24px 0",
}));

const StyledCloseIcon = styled(CloseOutlinedIcon)(() => ({
  padding: "2px",
  margin: "0 5px",
  fontSize: "larger",
  "&:hover": {
    border: "1px solid #fff",
    borderRadius: "4px",
    margin: "0 4px",
  },
}));

const StyledVersusText = styled(Typography)(() => ({
  margin: "0 12px",
}));

const StyledBattleCardsContainer = styled(Grid)(() => ({
  justifyContent: "center",
  alignItems: "center",
}));

const StyledBattleInfoContainer = styled(Grid)(() => ({
  alignItems: "center",
  flexDirection: "row",
  flexWrap: "nowrap",
}));

const BattleInfo: FC = () => {
  const [canBattle, setCanBattle] = useState(false);
  const { battleCards } = useAppSelector(selectBattlePokemons);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setCanBattle(battleCards.length >= 2);
  }, [battleCards]);

  const renderBattleVersus = (): ReactNode => {
    const onCardDelete = (id: string) => {
      dispatch(removePokemonFromBattle(id));
    };
    switch (battleCards.length) {
      case 1:
        return (
          <StyledBattleCardsContainer container>
            <StyledCloseIcon onClick={() => onCardDelete(battleCards[0].id)} />
            <Typography variant="h6">{battleCards[0].name}</Typography>
            <StyledVersusText variant="body2">VS</StyledVersusText>
            <Typography variant="h6">???</Typography>
          </StyledBattleCardsContainer>
        );
      case 2:
        return (
          <StyledBattleCardsContainer container>
            <StyledCloseIcon onClick={() => onCardDelete(battleCards[0].id)} />
            <Typography variant="h6">{battleCards[0].name}</Typography>
            <StyledVersusText variant="body2">VS</StyledVersusText>
            <Typography variant="h6">{battleCards[1].name}</Typography>
            <StyledCloseIcon onClick={() => onCardDelete(battleCards[1].id)} />
          </StyledBattleCardsContainer>
        );
      default:
        return (
          <StyledVersusText>
            ???{"\t"}VS{"\t"}???
          </StyledVersusText>
        );
    }
  };

  return battleCards.length > 0 ? (
    <StyledBattleInfoContainer container>
      {renderBattleVersus()}
      <Space />
      {canBattle && (
        <Button variant={"outlined"} color="inherit">
          <Typography variant="body1">Battle!</Typography>
        </Button>
      )}
    </StyledBattleInfoContainer>
  ) : null;
};

export default BattleInfo;
