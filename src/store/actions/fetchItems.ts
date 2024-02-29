import { Dispatch } from "redux";
import { ItemsAction } from "../interfaces";
import { ItemsActionType } from "../interfaces/action-types";
import { api } from "../../api/api";
import { Item } from "../store";

const getItemsData = {
  action: "get_items",
  params: { ids: [] },
};

const getItemsById = async (ids: string[]) => {
  try {
    const items: Item[] = await api({
      ...getItemsData,
      params: { ids },
    })
      .then((res) => res.json())
      .then((res) => res.result);

    const uniqItems = new Map();

    items.forEach((el) => {
      uniqItems.set(el.id, el);
    });

    return Array.from(uniqItems.values());
  } catch (error) {
    throw new Error();
  }
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

      const ids = await api(getIdsData)
        .then((res) => res.json())
        .then((res) => res.result);

      const items = await getItemsById(ids);

      dispatch({
        type: ItemsActionType.RECEIVE_ITEMS,
        items: items,
      });
    } catch (err) {
      console.log(`ERR FETCH`);

      // Если API возвращает ошибку, следует вывести идентификатор ошибки в консоль, если он есть и повторить запрос.
      fetchItems(page);
      console.error(err);
    }
  };
};

export const filterItems = (params: Record<string, any>) => {
  return async (dispatch: Dispatch<ItemsAction>) => {
    try {
      const ids = await api({
        action: "filter",
        // почему не дали возможности фильтрации сразу по нескольким
        params,
      })
        .then((res) => res.json())
        .then((res) => res.result);

      const items = await getItemsById(ids);

      dispatch({
        type: ItemsActionType.RECEIVE_ITEMS,
        items: items,
      });
    } catch (error) {
      console.log(`ERR FILTER`);
      //Если API возвращает ошибку, следует вывести идентификатор ошибки в консоль, если он есть и повторить запрос.
      filterItems(params);
      console.error(error);
    }
  };
};
