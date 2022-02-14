import { createContext, useContext, useReducer } from "react";
import axios from "axios";
import reducer from "./data_reducer";

import {
  FETCH_CONTRACTS,
  FETCH_CONTRACT,
  FETCH_CARD,
  HANDLE_CHANGE,
  CREATE_CONTRACT,
  CREATE_CARD,
  IMAGE_UPLOADED,
  SAME_DETAILS,
  DELETE_CONTRACT,
  DISPLAY_ALERT,
  CLEAR_ALERT,
} from "./action";

const DataContext = createContext();

const intialState = {
  loading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
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
    "Alternate Monthly",
    "Quarterly",
    "Thrice A Year",
    "Twice A Year",
    "Yearly",
  ],
  service: [],
  preferred: { day: "", time: "10 am - 12 pm" },
  specialInstruction: "",
  area: "",
  comments: "",
  image: "",
  contract: "",
};

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialState);

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

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

  const deleteContract = async (id) => {
    try {
      const res = await axios.delete(`/contracts/${id}`);
      console.log(res.data.msg);
      dispatch({ type: DELETE_CONTRACT });
    } catch (error) {
      console.log(error);
    }
  };

  const sameDetails = () => {
    dispatch({ type: SAME_DETAILS });
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    console.log(file);

    const form = new FormData();
    form.append("image", file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const res = await axios.post("/service/upload", form, config);
      dispatch({ type: IMAGE_UPLOADED, payload: res.data.image });
      console.log(res.data.image);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCard = async (id) => {
    try {
      const { comments, image } = state;
      const res = await axios.patch(`/service/${id}`, {
        comments,
        image,
      });
      console.log("success");
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

  return (
    <DataContext.Provider
      value={{
        ...state,
        fetchContracts,
        fetchSingleContract,
        fetchSingleCard,
        handleChange,
        createContract,
        createCard,
        handleImage,
        updateCard,
        sameDetails,
        deleteContract,
        displayAlert,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(DataContext);
};
