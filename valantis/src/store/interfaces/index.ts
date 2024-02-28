import { Item } from "../store";
import { ItemsActionType } from "./action-types";

export interface requestItems {
  type: ItemsActionType.REQUEST_ITEMS;
}

export interface receiveItems {
  type: ItemsActionType.RECEIVE_ITEMS;
  items: Item[];
}

export interface errorItems {
  type: ItemsActionType.ERROR_ITEMS;
  errMsg: string;
}

export type ItemsAction = requestItems | receiveItems | errorItems;
