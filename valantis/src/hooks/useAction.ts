import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCrateors } from "../store";

const useAction = () => {
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return bindActionCreators(actionCrateors, dispatch);
};

export default useAction;
