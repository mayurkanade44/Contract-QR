import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "./data_reducer";

import { LOADING, FETCH_CONTRACTS, FETCH_CONTRACT, FETCH_CARD } from "./action";

const DataContext = createContext();

const intialState = {
  loading: false,
  contracts: [],
  contract: [],
  card: [],
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

  const fetchSingleContract = async (id) => {
    try {
      const res = await axios.get(`/contracts/${id}`);
      dispatch({
        type: FETCH_CONTRACT,
        payload: res.data.contract,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSingleCard = async (id) => {
    try {
      const res = await axios.get(`/service/${id}`);

      dispatch({
        type: FETCH_CARD,
        payload: res.data.service,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, []);

  return (
    <DataContext.Provider
      value={{ ...state, fetchSingleContract, fetchSingleCard }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(DataContext);
};
