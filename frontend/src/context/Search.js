import { createContext, useContext, useState } from "react";

export const SearchContext = createContext()
export const useSearch = () => useContext(SearchContext)

export default function SearchProvider( { children } ){
    const [search, setSearch] = useState('')
    const [spotsArr, setSpotsArr] = useState([])

    return (
        <SearchContext.Provider value={{search, setSearch, spotsArr, setSpotsArr}}>
            {children}
        </SearchContext.Provider>

    )
}
