import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Card } from "../api/api-client";
import { RootState } from "../app/store";

export interface PokemonBattleState {
  cards: Card[];
  error: boolean;
}

const initialState: PokemonBattleState = {
  cards: [],
  error: false,
};

export const pokemonBattleSlice = createSlice({
  name: "pokemonBattle",
  initialState,
  reducers: {
    addPokemonToBattle: (state, action: PayloadAction<Card>) => {
      if (state.cards.length >= 2) {
        state.error = true;
        return;
      }
      state.cards.push(action.payload);
    },
    removePokemonFromBattle: (state, action: PayloadAction<string>) => {
      const index = state.cards.findIndex((card) => card.id === action.payload);
      state.cards.splice(index, 1);
    },
    clearBattlePokemons: (state) => {
      state.cards = [];
    },
    clearError: (state) => {
      state.error = false;
    },
  },
});

export const {
  addPokemonToBattle,
  clearBattlePokemons,
  clearError,
  removePokemonFromBattle,
} = pokemonBattleSlice.actions;

export const selectBattlePokemons = (state: RootState) => ({
  battleCards: state.pokemons.cards,
  error: state.pokemons.error,
});

export default pokemonBattleSlice.reducer;
