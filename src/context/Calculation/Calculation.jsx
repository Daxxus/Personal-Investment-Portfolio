import React, { createContext, useState } from "react"

export const CalculationContext = createContext(null)

export const CalcProvider = ({children})=>{
    const [currencyROI, setCurrencyROI] = useState(0)
    const [commodityyROI, setCommodityROI] = useState(0)
    const [coinROI, setCoinROI] = useState(0)
    const [totalROI, setTotalROI] = useState(0)
    return(
        <CalculationContext.Provider
        value= {{
            currencyROI, setCurrencyROI,
            commodityyROI, setCommodityROI,
            coinROI, setCoinROI,
            totalROI, setTotalROI
        }}
        >
            {children}
        </CalculationContext.Provider>
    )
}
export default CalculationContext