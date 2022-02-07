import { LOADING, FETCH_CONTRACTS, FETCH_CONTRACT } from "./action";

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
        loading:false,
        contract: action.payload,
      };
    }
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default data_reducer;
