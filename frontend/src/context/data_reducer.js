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
} from "./action";

import { initialState } from "./data_context";

const data_reducer = (state, action) => {
  switch (action.type) {
    case LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case CLEAR_ALERT: {
      return {
        ...state,
        loading: false,
        showAlert: false,
        alertText: "",
        alertType: "",
      };
    }
    case DISPLAY_ALERT: {
      return {
        ...state,
        loading: false,
        showAlert: true,
        alertText: "provide name",
        alertType: "danger",
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        user: action.payload.name,
        alertText: action.payload.msg,
        alertType: "success",
        showAlert: "true",
      };
    }
    case REGISTER_FAIL: {
      return {
        ...state,
        loading: false,
        alertText: action.payload.msg,
        alertType: "danger",
        showAlert: "true",
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        user: action.payload.name,
        alertText: "Redirecting to home page",
        alertType: "success",
        showAlert: "true",
      };
    }
    case LOGIN_FAIL: {
      return {
        ...state,
        loading: false,
        alertText: action.payload.msg,
        alertType: "danger",
        showAlert: "true",
      };
    }
    case LOGOUT: {
      return {
        ...initialState,
        loading: false,
        user: null,
        token: null,
      };
    }
    case FETCH_CONTRACTS: {
      return {
        ...state,
        loading: false,
        contracts: action.payload,
      };
    }
    case FETCH_CONTRACT: {
      return {
        ...state,
        loading: false,
        singleContract: action.payload.contract,
        contract: action.payload.id,
      };
    }
    case FETCH_CARD: {
      return {
        ...state,
        loading: false,
        card: action.payload,
      };
    }
    case HANDLE_CHANGE: {
      const { name, value, id } = action.payload;
      if (id === "billToAddress") {
        return {
          ...state,
          billToAddress: { ...state.billToAddress, [name]: value },
        };
      }
      if (id === "shipToAddress") {
        return {
          ...state,
          shipToAddress: { ...state.shipToAddress, [name]: value },
        };
      }
      if (id === "billToContact") {
        return {
          ...state,
          billToContact: { ...state.billToContact, [name]: value },
        };
      }
      if (id === "shipToContact") {
        return {
          ...state,
          shipToContact: { ...state.shipToContact, [name]: value },
        };
      }
      if (id === "preferred") {
        return {
          ...state,
          preferred: { ...state.preferred, [name]: value },
        };
      }
      if (id === "billToContact1") {
        return {
          ...state,
          billToContact1: { ...state.billToContact1, [name]: value },
        };
      }
      if (id === "billToContact2") {
        return {
          ...state,
          billToContact2: { ...state.billToContact2, [name]: value },
        };
      }
      if (id === "billToContact3") {
        return {
          ...state,
          billToContact3: { ...state.billToContact3, [name]: value },
        };
      }
      if (id === "shipToContact1") {
        return {
          ...state,
          shipToContact1: { ...state.shipToContact1, [name]: value },
        };
      }
      if (id === "shipToContact2") {
        return {
          ...state,
          shipToContact2: { ...state.shipToContact2, [name]: value },
        };
      }
      if (id === "shipToContact3") {
        return {
          ...state,
          shipToContact3: { ...state.shipToContact3, [name]: value },
        };
      }
      return { ...state, [name]: value };
      
    
    }
    case SAME_DETAILS: {
      return {
        ...state,
        loading: false,
        shipToAddress: state.billToAddress,
        shipToContact: state.billToContact,
      };
    }
    case CREATE_CONTRACT: {
      return {
        ...state,
        loading: false,
        contractCreated: true,
        contract: action.payload.contractId,
        alertText: "Contract Created Successfully",
        alertType: "success",
        showAlert: "true",
      };
    }
    case CONTRACT_FAIL: {
      return {
        ...state,
        loading: false,
        alertText: action.payload.msg,
        alertType: "danger",
        showAlert: "true",
      };
    }
    case DELETE_CONTRACT: {
      return {
        ...state,
        loading: false,
        contract: 1,
      };
    }
    case CREATE_CARD: {
      return {
        ...state,
        loading: false,
        contractCreated: false,
      };
    }
    case CREATE_CARDS: {
      return {
        ...state,
        loading: false,
      };
    }

    case CLEAR_VALUES: {
      return {
        ...state,
        loading: false,
        frequency: "Daily",
        service: [],
        comments: "",
        completion: "Completed",
        image: "",
        contractNo: "",
        business: "Residential",
        area: "",
        endContract: "1 Month (30 Days)",
        specialInstruction: "",
        billingFrequency: "",
        startDate: new Date().toISOString().slice(0, 10),
        preferred: { day: "", time: "10 am - 12 pm" },
        contractCreated: false,
        search: "",
      };
    }
    case IMAGE_UPLOADED: {
      return {
        ...state,
        loading: false,
        image: action.payload,
      };
    }

    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default data_reducer;
