import { Dispatch } from "redux";
import { ItemsAction } from "../interfaces";
import { ItemsActionType } from "../interfaces/action-types";
import { api } from "../../api/api";
import { Item } from "../store";

const getItemsData = {
  action: "get_items",
  params: { ids: [] },
};

export const fetchItems = (page: number) => {
  return async (dispatch: Dispatch<ItemsAction>) => {
    try {
      dispatch({
        type: ItemsActionType.REQUEST_ITEMS,
      });

      const getIdsData = {
        action: "get_ids",
        params: { offset: 50 * page, limit: 50 },
      };

      const ids = await api(getIdsData).then((res) => res.json());

      const items: Item[] = await api({
        ...getItemsData,
        params: { ids: [...ids.result] },
      })
        .then((res) => res.json())
        .then((res) => res.result);

      const uniqItems = new Map();

      items.forEach((el) => {
        uniqItems.set(el.id, el);
      });

      dispatch({
        type: ItemsActionType.RECEIVE_ITEMS,
        items: Array.from(uniqItems.values()),
      });
    } catch (err) {
      console.log(`ERR`);
      console.error(err);
    }
  };
};
