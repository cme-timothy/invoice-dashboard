import { DataContext } from "../contexts/DataContext";
import { useContext } from "react";

export const useDataContext = () => {
  const contextValues = useContext(DataContext);

  if (!contextValues) {
    throw new Error("useGlobalContext is used outside its context");
  }

  return contextValues;
};
