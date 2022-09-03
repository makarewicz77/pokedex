import axios, { AxiosRequestHeaders } from "axios";

interface Ability {
  name: string;
  text: string;
  type: string;
}

interface Attack {
  cost: string[];
  name: string;
  text: string;
  damage: string;
  convertedEnergyCost: string;
}

interface Resistance {
  type: string;
  value: string;
}

interface Weakness extends Resistance {}

interface SetImage {
  symbol: string;
  logo: string;
}

interface CardImage {
  small: string;
  large: string;
}

enum LEGALITY {
  LEGAL = "Legal",
  BANNED = "Banned",
}

interface Legality {
  expanded: LEGALITY | undefined;
  standard: LEGALITY | undefined;
  unlimited: LEGALITY | undefined;
}

interface Set {
  id: string;
  images: SetImage;
  legalities: Legality;
  name: string;
  printedTotal: number;
  ptcgoCode: string;
  releaseDate: string;
  series: string;
  total: number;
  updatedAt: string;
}

interface AncientTrait {
  name: string;
  text: string;
}

interface TCGPlayer {
  url: string;
  updatedAt: string;
  prices: {
    normal: Price | undefined;
    holofoil: Price | undefined;
    reverseHolofoil: Price | undefined;
    "1stEditionNormal": Price | undefined;
    "1stEditionHolofoil": Price | undefined;
  };
}

interface Price {
  low: number | null;
  mid: number | null;
  high: number | null;
  market: number | null;
  directLow: number | null;
}

interface Cardmarket {
  url: string;
  updatedAt: string;
  prices: {
    averageSellPrice: number | null;
    lowPrice: number | null;
    trendPrice: number | null;
    germanProLow: number | null;
    suggestedPrice: number | null;
    reverseHoloSell: number | null;
    reverseHoloLow: number | null;
    reverseHoloTrend: number | null;
    lowPriceExPlus: number | null;
    avg1: number | null;
    avg7: number | null;
    avg30: number | null;
    reverseHoloAvg1: number | null;
    reverseHoloAvg7: number | null;
    reverseHoloAvg30: number | null;
  };
}

export interface Card {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  hp?: string;
  types?: string[];
  evolesFrom?: string;
  evolvesTo?: string[];
  rules?: string[];
  ancientTrait?: AncientTrait;
  abilities?: Ability[];
  attacks?: Attack[];
  weaknesses?: Weakness[];
  resistances?: Resistance[];
  retreatCost?: string[];
  convertedRetreatCost?: number;
  set: Set;
  number: string;
  artist?: string;
  rarity: string;
  flavorText?: string;
  nationalPokedexNumbers?: number[];
  legalities: LEGALITY;
  images: CardImage;
  tcgplayer?: TCGPlayer;
  cardmarket?: Cardmarket;
}

type Paginated<T> = {
  count: number;
  page: number;
  pageSize: number;
  totalCount: number;
  data: T;
};

type QueryParams = {
  q?: string;
  page: number;
  pageSize: number;
  orderBy: string;
  select?: string[];
};

const pokemonTCGBaseUrl = "https://api.pokemontcg.io/v2/";
const headers: AxiosRequestHeaders = { "Content-Type": "application/json" };
const apiKey = process.env.REACT_APP_POKEMON_TCG_API_KEY;

if (apiKey != null) {
  headers["X-Api-Key"] = apiKey;
}

const pokemonTCGClient = axios.create({
  baseURL: pokemonTCGBaseUrl,
  headers,
});

export const getCards = async (
  params: QueryParams
): Promise<{ cards: Card[]; totalCount: number }> => {
  const {
    data: { data: cards, totalCount },
  } = await pokemonTCGClient.get<Paginated<Card[]>>("/cards", {
    params: {
      ...params,
      select: params?.select != null ? params?.select.join(",") : "",
    },
  });

  return { cards, totalCount };
};

export const getCard = async (cardId: string): Promise<Card> => {
  const {
    data: { data: card },
  } = await pokemonTCGClient.get<{ data: Card }>(`/cards/${cardId}`);

  return card;
};
