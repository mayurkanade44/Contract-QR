import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "./data_reducer";

import {
  LOADING,
  FETCH_CONTRACTS,
  FETCH_CONTRACT,
  FETCH_CARD,
  HANDLE_CHANGE,
  CREATE_CONTRACT,
} from "./action";

const DataContext = createContext();

const intialState = {
  loading: false,
  contracts: [],
  contract: [],
  card: [],
  contractNo: "",
  billToAddress: {
    name: "",
    address: "",
    nearBy: "",
    city: "",
    pincode: "",
  },
  billToContact: [
    {
      name: "",
      contact: "",
      email: "",
    },
  ],
  shipToAddress: {
    name: "",
    address: "",
    nearBy: "",
    city: "",
    pincode: "",
  },

  shipToContact: [
    {
      name: "",
      contact: "",
      email: "",
    },
  ],
  startDate: "",
  billingFrequency: "",
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

  const createContract = async () => {
    try {
      const {
        contractNo,
        billToAddress,
        shipToAddress,
        shipToContact,
        billToContact,
        startDate,
        billingFrequency,
      } = state;
      const res = await axios.post("/contracts", {
        contractNo,
        billToAddress,
        billToContact,
        shipToAddress,
        shipToContact,
        startDate,
        billingFrequency,
      });
      dispatch({
        type: CREATE_CONTRACT,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const id = e.target.id;

    dispatch({ type: HANDLE_CHANGE, payload: { name, value, id } });
  };

  useEffect(() => {
    fetchContracts();
  }, []);

  return (
    <DataContext.Provider
      value={{
        ...state,
        fetchSingleContract,
        fetchSingleCard,
        handleChange,
        createContract,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(DataContext);
};
