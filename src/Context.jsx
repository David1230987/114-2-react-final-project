import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [currentMoney, setCurrentMoney] = useState(500);
  const [bgTheme, setBgTheme] = useState("offwhite");
  const [isGambling, setIsGambling] = useState(false);
  const [ownedItems, setOwnedItems] = useState(["offwhite"]);

   const addOwnedItems = (newItem) => {
     setOwnedItems((prevList) => [...prevList,newItem]);
   }
  
  return (
    <DataContext.Provider value={{ currentMoney, setCurrentMoney, bgTheme, setBgTheme, isGambling, setIsGambling, ownedItems, addOwnedItems }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}