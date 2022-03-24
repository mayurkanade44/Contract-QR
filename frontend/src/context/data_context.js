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
  CLEAR_VALUES,
  CONTRACT_FAIL,
  FETCH_SERVICES,
  UPDATE_CARD,
  CARD_FAIL,
} from "./action";

const DataContext = createContext();

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

export const initialState = {
  loading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user || null,
  token: token || null,
  role: role || null,
  contracts: [],
  singleContract: [],
  card: [],
  contractCreated: false,
  contractNo: "",
  allServices: [],
  billToAddress: {
    prefix: "Mr",
    name: "",
    address1: "",
    address2: "",
    address3: "",
    address4: "",
    nearBy: "",
    city: "",
    pincode: "",
  },
  billToContact1: [
    {
      name: "",
      contact: "",
      email: "",
    },
  ],
  billToContact2: [
    {
      name: "",
      contact: "",
      email: "",
    },
  ],
  billToContact3: [
    {
      name: "",
      contact: "",
      email: "",
    },
  ],
  shipToAddress: {
    prefix: "Mr",
    name: "",
    address1: "",
    address2: "",
    address3: "",
    address4: "",
    nearBy: "",
    city: "",
    pincode: "",
  },

  shipToContact1: [
    {
      name: "",
      contact: "",
      email: "",
    },
  ],
  shipToContact2: [
    {
      name: "",
      contact: "",
      email: "",
    },
  ],
  shipToContact3: [
    {
      name: "",
      contact: "",
      email: "",
    },
  ],
  startDate: new Date().toISOString().slice(0, 10),
  billingFrequency: "",
  frequency: "Daily",
  service: [],
  endContract: "1 Year",
  preferred: { day: "", time: "10 am - 12 pm" },
  specialInstruction: "",
  business: "Offices",
  area: "",
  comments: "",
  treatmentLocation: "",
  completion: "Completed",
  image: "",
  search: "",
  contract: "",
  chemicals: [],
  del: false,
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

  const addLocalStorage = ({ name, token, role }) => {
    localStorage.setItem("user", name);
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
  };

  const removeLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  const registerUser = async (currentUser) => {
    dispatch({ type: LOADING });
    try {
      const res = await axios.post("/register", currentUser);
      const { name, role, token, msg } = res.data;
      dispatch({ type: REGISTER_SUCCESS, payload: { name, role, token, msg } });
      addLocalStorage({ name, token, role });
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
      const { name, token, role } = res.data;
      dispatch({ type: LOGIN_SUCCESS, payload: { name, token, role } });
      addLocalStorage({ name, token, role });
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

  const paginate = (contracts) => {
    const limit = 10;
    const pages = Math.ceil(contracts.length / limit);
    const newContracts = Array.from({ length: pages }, (_, index) => {
      const start = index * limit;
      return contracts.slice(start, start + limit);
    });
    return newContracts;
  };

  const fetchContracts = async () => {
    const { search } = state;
    let url = "/contracts";
    if (search) {
      url = url + `?search=${search}`;
    }
    dispatch({ type: LOADING });
    try {
      const res = await axios.get(url);

      dispatch({
        type: FETCH_CONTRACTS,
        payload: paginate(res.data.contracts),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const fetchServices = async () => {
    dispatch({ type: LOADING });
    try {
      const res = await axios.get("/service");
      dispatch({ type: FETCH_SERVICES, payload: res.data.services });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSingleContract = async (id) => {
    dispatch({ type: LOADING });
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
    dispatch({ type: LOADING });
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
      await axios.delete(`/contracts/${id}`);
      dispatch({ type: DELETE_CONTRACT });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      console.log(error);
    }
  };

  const sameDetails = () => {
    dispatch({ type: SAME_DETAILS });
  };

  const createContract = async (last) => {
    try {
      const {
        contractNo,
        billToAddress,
        shipToAddress,
        shipToContact1,
        shipToContact2,
        shipToContact3,
        billToContact1,
        billToContact2,
        billToContact3,
        startDate,
        billingFrequency,
        preferred,
        specialInstruction,
        area,
        business,
      } = state;
      const upper = contractNo[0].toUpperCase() + contractNo.slice(1);
      const instructions = [];
      specialInstruction
        .split(",")
        .map((inst) => instructions.push(inst.trim()));
      const home = [
        "1 RK",
        "1 BHK",
        "2 BHK",
        "3 BHK",
        "4 BHK",
        "5 BHK",
        "Bungalow",
      ];

      const res = await axios.post("/contracts", {
        contractNo: upper,
        billToAddress,
        shipToContact1,
        shipToContact2,
        shipToContact3,
        billToContact1,
        billToContact2,
        billToContact3,
        shipToAddress,
        startDate,
        endDate: last,
        billingFrequency,
        business,
        preferred,
        specialInstruction: instructions,
        area: home.includes(business) ? business : area,
      });
      const contractId = res.data.contract._id;
      dispatch({
        type: CREATE_CONTRACT,
        payload: { contractId },
      });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      dispatch({
        type: CONTRACT_FAIL,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const createCard = async (dueMonths, value, chemicals) => {
    const serv = [];
    dispatch({ type: LOADING });
    try {
      const { frequency, contract, treatmentLocation } = state;
      value.split(",").map((ser) => {
        return serv.push(ser.trim());
      });
      if (serv.includes("Ratrid") && serv.length > 3) {
        return dispatch({ type: CARD_FAIL });
      }
      await axios.post("/service", {
        serviceDue: dueMonths,
        frequency,
        service: serv,
        treatmentLocation,
        contract,
        chemicals: chemicals,
      });
      dispatch({ type: CREATE_CARD });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      console.log(error);
    }
  };

  const createCards = async (id) => {
    dispatch({ type: LOADING });
    try {
      await axios.get(`/service/create/${id}`);
      dispatch({ type: CREATE_CARDS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      console.log(error);
    }
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];

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
    } catch (error) {
      console.log(error);
    }
  };

  const updateCard = async (id) => {
    dispatch({ type: LOADING });
    try {
      const { comments, image, completion } = state;
      await axios.patch(`/service/${id}`, {
        comments,
        completion,
        image,
      });
      dispatch({ type: UPDATE_CARD });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let id = e.target.id;
    let value = e.target.value;
    if (id === "ContractNumber") {
      value = e.target.value.replace(/[^\w/]/gi, "");
    }

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
        createCards,
        clearValues,
        fetchServices,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(DataContext);
};
