import React, { createContext, useContext, useState } from "react";

interface ISearch {
    search_item: string;
    text: string;
}
interface ISearchContext {
    search: ISearch;
    setSearch: React.Dispatch<React.SetStateAction<ISearch>>;
}
const SearchContext = createContext<ISearchContext | undefined>(undefined);

export const useSearchContext = () => useContext(SearchContext);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
    const [search, setSearch] = useState<ISearch>({
        search_item: "",
        text: "",
    });

    return (
        <SearchContext.Provider value={{ search, setSearch }}>
            {children}
        </SearchContext.Provider>
    );
};
