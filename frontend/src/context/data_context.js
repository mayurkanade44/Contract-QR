import { createContext, useContext, useReducer } from "react";
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
  IMAGE_UPLOADED,
  SAME_DETAILS,
  DELETE_CONTRACT,
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CREATE_CARDS,
} from "./action";

const DataContext = createContext();

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");

export const initialState = {
  loading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user || null,
  token: token || null,
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
  startDate: new Date().toISOString().slice(0, 10),
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
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 2000);
  };

  const addLocalStorage = ({ name, token }) => {
    localStorage.setItem("user", name);
    localStorage.setItem("token", token);
  };

  const removeLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const registerUser = async (currentUser) => {
    dispatch({ type: LOADING });
    try {
      const res = await axios.post("/register", currentUser);
      const { name, token, msg } = res.data;
      dispatch({ type: REGISTER_SUCCESS, payload: { name, token, msg } });
      addLocalStorage({ name, token });
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: LOADING });
    try {
      const res = await axios.post("/login", currentUser);
      const { name, token } = res.data;
      dispatch({ type: LOGIN_SUCCESS, payload: { name, token } });
      addLocalStorage({ name, token });
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const logout = async () => {
    dispatch({ type: LOGOUT });
    removeLocalStorage();
  };

  const fetchContracts = async () => {
    try {
      const res = await axios.get("/contracts");
      const date = new Date().toISOString();
      console.log(date);
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
        preferred,
        specialInstruction,
        area,
      } = state;
      const res = await axios.post("/contracts", {
        contractNo,
        billToAddress,
        billToContact,
        shipToAddress,
        shipToContact,
        startDate,
        billingFrequency,
        preferred,
        specialInstruction,
        area,
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
        contract,
      } = state;
      service.split(",").map((ser) => {
        return serv.push(ser);
      });
      const res = await axios.post("/service", {
        serviceDue: dueMonths,
        frequency,
        service: serv,
        contract,
      });
      dispatch({ type: CREATE_CARD });
    } catch (error) {
      console.log(error);
    }
  };

  const createCards = async (id) => {
    try {
      const res = await axios.get(`/service/create/${id}`);
      dispatch({
        type: CREATE_CARDS,
      });
    } catch (error) {
      console.log(error);
    }

  }

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
        registerUser,
        loginUser,
        logout,
        createCards
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(DataContext);
};
