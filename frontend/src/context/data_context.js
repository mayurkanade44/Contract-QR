import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "./data_reducer";

import { LOADING, FETCH_CONTRACTS } from "./action";

const DataContext = createContext();

const intialState = {
  loading: false,
  contracts: [],
};

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialState);

  const fetchContracts = async () => {
    try {
      const res = await axios.get("/contracts");
      dispatch({
        type: FETCH_CONTRACTS,
        payload: res.data.contracts,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, []);

  return (
    <DataContext.Provider value={{ ...state }}>{children}</DataContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(DataContext);
};
