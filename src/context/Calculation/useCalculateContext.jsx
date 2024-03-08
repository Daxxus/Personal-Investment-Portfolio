import CalculationContext from "./Calculation";
import { useContext } from "react";



export const useCalculateContext = () => {
    const ctx = useContext(CalculationContext)
    if(!ctx){
        throw new Error("Missing CalculateContext, it's not wrapped in CalculateProvider")
    }

  return ctx
}

