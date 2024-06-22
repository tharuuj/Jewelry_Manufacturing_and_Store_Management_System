// Create a new file, e.g., EmployeeCountContext.js
import React, { createContext, useContext, useState } from 'react';

const EmployeeCountContext = createContext();

export const useEmployeeCount = () => useContext(EmployeeCountContext);

export const EmployeeCountProvider = ({ children }) => {
  const [employeeCount, setEmployeeCount] = useState(0);

  return (
    <EmployeeCountContext.Provider value={{ employeeCount, setEmployeeCount }}>
      {children}
    </EmployeeCountContext.Provider>
  );
};
