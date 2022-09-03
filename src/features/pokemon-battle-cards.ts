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
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addPokemonToBattle: (state, action: PayloadAction<Card>) => {
      if (state.cards.length >= 2) {
        state.error = true;
        return;
      }
      state.cards.push(action.payload);
    },
    clearBattlePokemons: (state) => {
      state.cards = [];
    },
    clearError: (state) => {
      state.error = false;
    },
  },
});

export const { addPokemonToBattle, clearBattlePokemons, clearError } =
  pokemonBattleSlice.actions;

export const selectBattlePokemons = (state: RootState) => ({
  battleCards: state.pokemons.cards,
  error: state.pokemons.error,
});

export default pokemonBattleSlice.reducer;
