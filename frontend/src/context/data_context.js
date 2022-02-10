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
  CREATE_CARD,
} from "./action";

const DataContext = createContext();

const intialState = {
  loading: false,
  contracts: [],
  singleContract: [],
  card: [],
  contractCreated: false,
  contractNo: "",
  billToAddress: {
    name: "",
    address1: "",
    address2: "",
    address3: "",
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
    address1: "",
    address2: "",
    address3: "",
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
  numberOfCards: "",
  frequency: "Daily",
  frequencyList: [
    "Daily",
    "Thrice A Week",
    "Twice A Week",
    "Weekly",
    "Thrice A Month",
    "Fortnightly",
    "Monthly",
    "Quarterly",
    "Thrice A Year",
    "Twice A Year",
    "Yearly",
  ],
  service: [],
  preferred: { day: "", time: "" },
  specialInstruction: "",
  area: "",
  comments: "",
  contract: "",
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
      const contract = res.data.contract;
      dispatch({
        type: FETCH_CONTRACT,
        payload: { contract, id },
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
        numberOfCards,
      } = state;
      const res = await axios.post("/contracts", {
        contractNo,
        billToAddress,
        billToContact,
        shipToAddress,
        shipToContact,
        startDate,
        billingFrequency,
        numberOfCards,
      });
      const contractId = res.data.contract._id;
      dispatch({
        type: CREATE_CONTRACT,
        payload: { contractId },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createCard = async (dueMonths) => {
    const serv = [];
    try {
      const {
        frequency,
        service,
        preferred,
        specialInstruction,
        area,
        contract,
      } = state;
      service.split(",").map((ser) => {
        return serv.push(ser);
      });
      const res = await axios.post("/service", {
        serviceDue: dueMonths,
        frequency,
        service: serv,
        preferred,
        contract,
        specialInstruction,
        area,
      });
      dispatch({ type: CREATE_CARD });
      console.log(serv);
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
        createCard,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(DataContext);
};
