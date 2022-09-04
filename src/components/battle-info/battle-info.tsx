import styled from "@emotion/styled";
import { Button, Grid, Modal, Typography } from "@mui/material";
import React, { FC, ReactNode, useState } from "react";
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

const StyledImage = styled("img")({
  width: "100%",
  maxWidth: "500px",
  boxShadow: "4px 4px 8px 0px rgba(0, 0, 0, 0.4)",
  borderRadius: "16px",
});

const StyledModalContainer = styled(Grid)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "1200px",
  backgroundColor: "#fff",
  padding: "24px",
});

const StyledBattleCardContainer = styled(Grid)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const StyledBattleCardDetailsContainer = styled(Grid)({
  marginLeft: "16px",
  flexDirection: "row",
});

const StyledBattleCardValueText = styled(Typography)({
  paddingLeft: "12px",
});

const StyledBattleCardDetailsValueContainer = styled(Grid)(() => ({
  display: "flex",
  alignItems: "center",
}));

const StyledBattleCardDetailsLabelContainer = styled(Grid)(() => ({
  display: "flex",
  justifyContent: "flex-end",
  textAlign: "end",
}));

const StyledBattleCardStatisticContainer = styled(Grid)(() => ({
  marginTop: "24px",
}));

const StyledBattleResultContainer = styled(Grid)(() => ({
  display: "flex",
  alignItems: "center",
  marginBottom: "12px",
}));

const StyledBattleWonContainer = styled(Grid)(() => ({
  display: "flex",
  justifyContent: "center",
}));

const BattleInfo: FC = () => {
  // states
  const [battleModalOpen, setBattleModalOpen] = useState(false);

  // redux
  const { battleCards } = useAppSelector(selectBattlePokemons);
  const dispatch = useAppDispatch();

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

  const renderBattleResult = (): ReactNode => {
    if (battleCards[0].hp == null || battleCards[1].hp == null) {
      return <></>;
    }

    const hp1 = parseInt(battleCards[0].hp);
    const hp2 = parseInt(battleCards[1].hp);

    const damage1 = battleCards[0].attacks?.reduce((acc, curr) => {
      if (!isNaN(parseInt(curr.damage))) {
        acc += parseInt(curr.damage);
      }
      return acc;
    }, 0);
    const damage2 = battleCards[1].attacks?.reduce((acc, curr) => {
      if (!isNaN(parseInt(curr.damage))) {
        acc += parseInt(curr.damage);
      }
      return acc;
    }, 0);

    if (!isNaN(hp1) && !isNaN(hp2) && damage1 != null && damage2 != null) {
      const diff1 = hp1 - damage2;
      const diff2 = hp2 - damage1;

      if (diff1 < diff2) {
        return (
          <>
            <StyledBattleWonContainer item xs={1} />
            <StyledBattleWonContainer item xs={1}>
              <Typography>WIN</Typography>
            </StyledBattleWonContainer>
          </>
        );
      } else if (diff2 < diff1) {
        return (
          <>
            <StyledBattleWonContainer item xs={1}>
              <Typography>WIN</Typography>
            </StyledBattleWonContainer>
            <StyledBattleWonContainer item xs={1} />
          </>
        );
      } else {
        return (
          <StyledBattleWonContainer item xs={2}>
            <Typography>DRAW</Typography>
          </StyledBattleWonContainer>
        );
      }
    }
    return <></>;
  };

  return battleCards.length > 0 ? (
    <StyledBattleInfoContainer container>
      {renderBattleVersus()}
      <Space />
      {battleCards.length >= 2 && (
        <>
          <Button
            variant={"outlined"}
            color="inherit"
            onClick={() => setBattleModalOpen(true)}
          >
            <Typography variant="body1">Battle!</Typography>
          </Button>
          <Modal
            open={battleModalOpen}
            onClose={() => setBattleModalOpen(false)}
          >
            <StyledModalContainer width={{ xs: "90%", sm: "70%", md: "50%" }}>
              <StyledBattleResultContainer container columns={2}>
                {battleCards.length >= 2 && renderBattleResult()}
              </StyledBattleResultContainer>
              <Grid container columns={15}>
                <StyledBattleCardContainer item xs={7}>
                  <StyledImage
                    src={`${battleCards[0].images.small}?wfit=crop&auto=format`}
                    alt={battleCards[0].name}
                    loading="lazy"
                  />

                  <StyledBattleCardStatisticContainer>
                    {/* display hp */}
                    <StyledBattleCardDetailsContainer container columns={2}>
                      <StyledBattleCardDetailsLabelContainer item xs={1}>
                        <Typography variant="h6">HP:</Typography>
                      </StyledBattleCardDetailsLabelContainer>
                      <StyledBattleCardDetailsValueContainer item xs={1}>
                        <StyledBattleCardValueText variant="h6">
                          {battleCards[0].hp}
                        </StyledBattleCardValueText>
                      </StyledBattleCardDetailsValueContainer>
                    </StyledBattleCardDetailsContainer>

                    {/* display damage */}
                    <StyledBattleCardDetailsContainer container columns={2}>
                      <StyledBattleCardDetailsLabelContainer item xs={1}>
                        <Typography variant="h6">Summary damage:</Typography>
                      </StyledBattleCardDetailsLabelContainer>
                      <StyledBattleCardDetailsValueContainer item xs={1}>
                        <StyledBattleCardValueText variant="h6">
                          {battleCards[0].attacks?.reduce((acc, curr) => {
                            if (!isNaN(parseInt(curr.damage))) {
                              acc += parseInt(curr.damage);
                            }
                            return acc;
                          }, 0)}
                        </StyledBattleCardValueText>
                      </StyledBattleCardDetailsValueContainer>
                    </StyledBattleCardDetailsContainer>
                  </StyledBattleCardStatisticContainer>
                </StyledBattleCardContainer>
                <Grid item xs={1} />
                <StyledBattleCardContainer item xs={7}>
                  <StyledImage
                    src={`${battleCards[1]?.images.small}?wfit=crop&auto=format`}
                    alt={battleCards[1].name}
                    loading="lazy"
                  />

                  <StyledBattleCardStatisticContainer>
                    {/* display hp */}
                    <StyledBattleCardDetailsContainer container columns={2}>
                      <StyledBattleCardDetailsLabelContainer item xs={1}>
                        <Typography variant="h6">HP:</Typography>
                      </StyledBattleCardDetailsLabelContainer>
                      <StyledBattleCardDetailsValueContainer item xs={1}>
                        <StyledBattleCardValueText variant="h6">
                          {battleCards[1].hp}
                        </StyledBattleCardValueText>
                      </StyledBattleCardDetailsValueContainer>
                    </StyledBattleCardDetailsContainer>

                    {/* display damage */}
                    <StyledBattleCardDetailsContainer container columns={2}>
                      <StyledBattleCardDetailsLabelContainer item xs={1}>
                        <Typography variant="h6">Summary damage:</Typography>
                      </StyledBattleCardDetailsLabelContainer>
                      <StyledBattleCardDetailsValueContainer item xs={1}>
                        <StyledBattleCardValueText variant="h6">
                          {battleCards[1].attacks?.reduce((acc, curr) => {
                            if (!isNaN(parseInt(curr.damage))) {
                              acc += parseInt(curr.damage);
                            }
                            return acc;
                          }, 0)}
                        </StyledBattleCardValueText>
                      </StyledBattleCardDetailsValueContainer>
                    </StyledBattleCardDetailsContainer>
                  </StyledBattleCardStatisticContainer>
                </StyledBattleCardContainer>
              </Grid>
            </StyledModalContainer>
          </Modal>
        </>
      )}
    </StyledBattleInfoContainer>
  ) : null;
};;;;;;;;;;;;;;;;;;;;;;;;;;;;

export default BattleInfo;
