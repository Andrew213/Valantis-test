import { useSelector, TypedUseSelectorHook } from "react-redux";
import { StateT } from "../store/store";

export const useTypedSelector: TypedUseSelectorHook<StateT> = useSelector;
