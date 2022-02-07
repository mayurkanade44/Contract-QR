import { createContext, useContext, useReducer } from "react";
import reducer from "./data_reducer";


const DataContext = createContext()

const intialState = {
  loading: false,
};


export const DataProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, intialState);

    return (
        <DataContext.Provider value={{...state}} >{children}</DataContext.Provider>
    )
}

export const useDataContext = () => {
    return useContext(DataContext)
}