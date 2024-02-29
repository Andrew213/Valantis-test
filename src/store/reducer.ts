import { ItemsAction } from "./interfaces";
import { ItemsActionType } from "./interfaces/action-types";
import { StateT, initialState } from "./store";

export const ItemsReducer = (
  state: StateT = initialState,
  action: ItemsAction
): StateT => {
  switch (action.type) {
    case ItemsActionType.REQUEST_ITEMS:
      return { ...state, loading: true };
    case ItemsActionType.RECEIVE_ITEMS:
      return { ...state, loading: false, items: action.items };
    default:
      return state;
  }
};
