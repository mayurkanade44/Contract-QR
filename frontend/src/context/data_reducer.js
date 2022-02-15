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
} from "./action";

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
