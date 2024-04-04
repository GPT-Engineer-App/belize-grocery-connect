import React from "react";
import { Select } from "@chakra-ui/react";

const StoreSelector = ({ stores, selectedStore, onStoreSelect }) => {
  return (
    <Select placeholder="Select a store" value={selectedStore} onChange={(e) => onStoreSelect(e.target.value)}>
      {stores.map((store) => (
        <option key={store.id} value={store.id}>
          {store.name}
        </option>
      ))}
    </Select>
  );
};

export default StoreSelector;
