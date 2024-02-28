import { createStore, applyMiddleware } from "redux";
import { ItemsReducer } from "./reducer";
import { thunk } from "redux-thunk";

export type Item = {
  brand: string | null;
  id: string;
  price: number;
  product: string;
};

export type StateT = {
  items: Item[];
  loading: boolean;
};

export const initialState: StateT = {
  items: [],
  loading: false,
};

export const store = createStore(
  ItemsReducer,
  initialState,
  applyMiddleware(thunk)
);
