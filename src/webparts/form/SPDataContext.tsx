import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SPFI } from "@pnp/sp";
import { WebPartContext } from "@microsoft/sp-webpart-base";

interface ISPDataContext {
  listItems: any[];
  setListItems: React.Dispatch<React.SetStateAction<any[]>>;
  context: WebPartContext | undefined;
}

const SPDataContext = createContext<ISPDataContext | undefined>(undefined);

export const useSPData = () => {
  const context = useContext(SPDataContext);
  if (!context) {
    throw new Error('useSPData must be used within a SPDataProvider');
  }
  return context;
};

export const SPDataProvider: React.FC<{ sp: SPFI, context: WebPartContext, children: ReactNode }> = ({ sp, context, children }) => {
  const [listItems, setListItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchListItems = async () => {
      try {
        const items = await sp.web.lists.getByTitle('YourListTitle').items();
        setListItems(items);
      } catch (error) {
        console.error("Error fetching list items: ", error);
      }
    };
    void fetchListItems();
  }, [sp]);

  return (
    <SPDataContext.Provider value={{ listItems, setListItems, context }}>
      {children}
    </SPDataContext.Provider>
  );
};
