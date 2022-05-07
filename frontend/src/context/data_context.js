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
  FETCH_USERS,
  DELETE_USER,
  RENEW_CONTRACT,
  COPY_CONTRACT,
  ALL_VALUES,
  ADD_VALUE,
  SEND_MAIL,
  DELETE_SERVICE,
  UPDATE_CONTRACT,
  SERVICE_REPORT,
  CLOSE_MODAL,
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
  type: "NC",
  sales: "PTL",
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
  billToContact1: {
    name: "Mr./Ms.",
    contact: "(M)/(T)",
    email: "",
  },

  billToContact2: {
    name: "",
    contact: "",
    email: "",
  },

  billToContact3: {
    name: "",
    contact: "",
    email: "",
  },

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

  shipToContact1: {
    name: "Mr./Ms.",
    contact: "(M)/(T)",
    email: "",
  },

  shipToContact2: {
    name: "",
    contact: "",
    email: "",
  },

  shipToContact3: {
    name: "",
    contact: "",
    email: "",
  },
  startDate: new Date().toISOString().slice(0, 10),
  billingFrequency: "",
  frequency: "Daily",
  service: [],
  endContract: "1 Year",
  preferred: { day: "", time: "10 am - 12 pm" },
  specialInstruction: "",
  business: "1 RK",
  area: "",
  comments: "All job done",
  treatmentLocation: "",
  completion: "Completed",
  image: "",
  serviceDate: new Date().toISOString().slice(0, 10),
  serviceReport: "",
  search: "",
  searchSD: "",
  searchED: "",
  contract: "",
  chemicals: [],
  del: false,
  allUsers: [],
  renew: false,
  addComment: "",
  addSale: "",
  addBusines: "",
  serviceChemicals: {
    label: "",
    value: "",
    chemical: "",
  },
  modal: false,
  adminList: [],
};

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authFetch = axios.create({
    baseURL: "/api",
  });

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logout();
      }
      return Promise.reject(error);
    }
  );

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
      const res = await authFetch.post("/register", currentUser);
      const { name, role, token, msg } = res.data;
      dispatch({ type: REGISTER_SUCCESS, payload: { name, role, token, msg } });
      // addLocalStorage({ name, token, role });
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
      const res = await axios.post("/api/login", currentUser);
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
    const limit = 50;
    const pages = Math.ceil(contracts.length / limit);
    const newContracts = Array.from({ length: pages }, (_, index) => {
      const start = index * limit;
      return contracts.slice(start, start + limit);
    });
    return newContracts;
  };

  const fetchContracts = async () => {
    const { search, searchSD, searchED } = state;
    let url = "/contracts";
    if (search) {
      url = url + `?search=${search}`;
    }
    if (searchED && searchSD) {
      url = url + `?searchSD=${searchSD}&searchED=${searchED}`;
    }
    dispatch({ type: LOADING });
    try {
      const res = await authFetch.get(url);

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

  const addComments = async () => {
    try {
      const { addComment } = state;
      const res = await authFetch.post("/admin", {
        commentsList: addComment,
      });
      dispatch({ type: ADD_VALUE, payload: res.data.msg });
    } catch (error) {
      console.log(error);
    }
  };

  const addSales = async () => {
    try {
      const { addSale } = state;
      const res = await authFetch.post("/admin", {
        sales: addSale,
      });
      dispatch({ type: ADD_VALUE, payload: res.data.msg });
    } catch (error) {
      console.log(error);
    }
  };

  const addBusiness = async () => {
    try {
      const { addBusines } = state;
      const res = await authFetch.post("/admin", {
        business: addBusines,
      });
      dispatch({ type: ADD_VALUE, payload: res.data.msg });
    } catch (error) {
      console.log(error);
    }
  };

  const addServiceChemicals = async () => {
    const { serviceChemicals } = state;
    try {
      const res = await authFetch.post("/admin", {
        serviceChemicals,
      });
      dispatch({ type: ADD_VALUE, payload: res.data.msg });
    } catch (error) {
      console.log(error);
    }
  };

  const allValues = async () => {
    try {
      const res = await authFetch.get("/admin");
      dispatch({ type: ALL_VALUES, payload: res.data.allValues });
    } catch (error) {
      console.log(error);
    }
  };

  const renewContract = () => {
    dispatch({ type: RENEW_CONTRACT });
    dispatch({ type: COPY_CONTRACT });
  };

  const fetchServices = async () => {
    dispatch({ type: LOADING });
    try {
      const res = await authFetch.get("/service");
      dispatch({ type: FETCH_SERVICES, payload: res.data.services });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSingleContract = async (id) => {
    dispatch({ type: LOADING });
    try {
      const res = await authFetch.get(`/contracts/${id}`);
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
      const res = await authFetch.get(`/service/${id}`);

      dispatch({
        type: FETCH_CARD,
        payload: res.data.service,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllUsers = async () => {
    dispatch({ type: LOADING });
    try {
      const res = await authFetch.get("/user");
      dispatch({ type: FETCH_USERS, payload: res.data.users });
    } catch (error) {
      console.log(error);
    }
  };

  const removeUser = async (id) => {
    dispatch({ type: LOADING });
    try {
      const res = await authFetch.delete(`/user/${id}`);
      dispatch({ type: DELETE_USER, payload: res.data.msg });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteContract = async (id) => {
    try {
      await authFetch.delete(`/contracts/${id}`);
      dispatch({ type: DELETE_CONTRACT });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteService = async (id) => {
    try {
      const res = await authFetch.delete(`/service/${id}`);
      dispatch({ type: DELETE_SERVICE, payload: res.data });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      dispatch({
        type: CONTRACT_FAIL,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const sameDetails = () => {
    dispatch({ type: SAME_DETAILS });
  };

  const createContract = async (last) => {
    try {
      const {
        contractNo,
        type,
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
        sales,
      } = state;
      const upper = contractNo[0].toUpperCase() + contractNo.slice(1);
      const instructions = [];
      specialInstruction
        .split(",")
        .map((inst) => instructions.push(inst.trim()));

      const res = await authFetch.post("/contracts", {
        contractNo: upper,
        type,
        sales: sales.toUpperCase(),
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
        preferred,
        specialInstruction: instructions,
      });
      const contractId = res.data.contract._id;
      dispatch({
        type: CREATE_CONTRACT,
        payload: { contractId },
      });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      console.log(error);
      dispatch({
        type: CONTRACT_FAIL,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const updateContract = async (id) => {
    dispatch({ type: LOADING });
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
      billingFrequency,
      preferred,
      startDate,
      sales,
    } = state;
    try {
      const res = await authFetch.patch(`/contracts/${id}`, {
        contractNo,
        sales: sales.toUpperCase(),
        billToAddress,
        shipToAddress,
        shipToContact1,
        shipToContact2,
        shipToContact3,
        billToContact1,
        billToContact2,
        billToContact3,
        billingFrequency,
        preferred,
        startDate,
      });
      dispatch({ type: UPDATE_CONTRACT, payload: res.data });
    } catch (error) {
      console.log(error);
    }
    clearAlert();
  };

  const createCard = async (dueMonths, value, chemicals) => {
    const serv = [];
    dispatch({ type: LOADING });
    const home = [
      "1 RK",
      "1 BHK",
      "2 BHK",
      "3 BHK",
      "4 BHK",
      "5 BHK",
      "Bungalow",
    ];
    try {
      const { frequency, contract, treatmentLocation, area, business } = state;
      value.split(",").map((ser) => {
        return serv.push(ser.trim());
      });
      if (serv.includes("Rat Rid") && serv.length > 5) {
        return dispatch({ type: CARD_FAIL });
      }
      await authFetch.post("/service", {
        serviceDue: dueMonths,
        business,
        frequency,
        service: serv,
        treatmentLocation,
        contract,
        chemicals: chemicals,
        area: home.includes(business) ? business : `${area} Sq.Ft`,
      });
      dispatch({ type: CREATE_CARD });
      // dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      console.log(error);
    }
  };

  const createCards = async (id) => {
    dispatch({ type: LOADING });
    try {
      const res = await authFetch.get(`/service/create/${id}`);
      dispatch({ type: CREATE_CARDS, payload: res.data.msg });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      console.log(error);
    }
  };

  const sendEmail = async (id) => {
    dispatch({ type: LOADING });
    try {
      const res = await authFetch.get(`/service/sendmail/${id}`);
      dispatch({ type: SEND_MAIL, payload: res.data.msg });
    } catch (error) {
      dispatch({
        type: CONTRACT_FAIL,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
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
      const res = await authFetch.post("/service/upload", form, config);
      dispatch({ type: IMAGE_UPLOADED, payload: res.data.image });
    } catch (error) {
      console.log(error);
    }
  };

  const updateCard = async (id) => {
    dispatch({ type: LOADING });
    try {
      const { comments, image, completion, serviceDate, card } = state;
      await authFetch.patch(`/service/${id}`, {
        contract: card[0].contract.contractNo,
        serviceName: card[0].service.toString(),
        comments,
        completion,
        image,
        serviceDate,
      });
      dispatch({ type: UPDATE_CARD });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      console.log(error);
    }
  };

  const generateReport = async (id) => {
    dispatch({ type: LOADING });
    try {
      const res = await authFetch.get(`/service/report/${id}`);
      console.log(res);
      dispatch({ type: SERVICE_REPORT, payload: res.data.msg });
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let id = e.target.id;
    let value = e.target.value;
    if (id === "ContractNumber") {
      value = e.target.value.replace(/[^\w-/]/gi, "");
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
        fetchAllUsers,
        removeUser,
        renewContract,
        addComments,
        allValues,
        addSales,
        addBusiness,
        sendEmail,
        addServiceChemicals,
        deleteService,
        updateContract,
        generateReport,
        closeModal
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(DataContext);
};
