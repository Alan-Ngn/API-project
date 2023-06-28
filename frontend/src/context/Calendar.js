import { createContext, useContext, useState } from "react";

export const CalendarContext = createContext()
export const useCalendar = () => useContext(CalendarContext)

export default function CalendarProvider( { children } ){
    const date = new Date()
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    const [value, onChange] = useState(new Date());
    // let date = `${year}-${month.toString().padStart(2,'0')}-${day}`;
    let today = `${year}-${month.toString().padStart(2,'0')}-${day}`;
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')


    return (
        <CalendarContext.Provider value={{startDate, setStartDate, endDate, setEndDate}}>
            {children}
        </CalendarContext.Provider>

    )
}
