import {
  LOADING,
  FETCH_CONTRACTS,
  FETCH_CONTRACT,
  FETCH_CARD,
  HANDLE_CHANGE,
  CREATE_CONTRACT,
} from "./action";

const data_reducer = (state, action) => {
  switch (action.type) {
    case LOADING: {
      return {
        ...state,
        loading: true,
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
        contract: action.payload,
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
      return { ...state, [name]: value };
    }
    case CREATE_CONTRACT: {
      return {
        ...state,
      };
    }

    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default data_reducer;
