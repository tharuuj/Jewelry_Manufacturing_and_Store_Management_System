import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import { Provider } from "react-redux";
import store from "./User/store";
import { BrowserRouter as Router } from "react-router-dom";

import ContextProvider from './Employee/Components/context/ContextProvider';
import {EmployeeCountProvider} from './Employee/Components/context/EmployeeCountContext';
import WorkContextProvider from './Employee/Components/context/WorkContextProvider';
import AttendanceContextProvider from './Employee/Components/context/AttendanceContextProvider'
import LeaveContextProvider from './Employee/Components/context/LeaveContextProvider'

window.store = store;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <EmployeeCountProvider>
    <ContextProvider>
      <WorkContextProvider>
        <AttendanceContextProvider>
          <LeaveContextProvider>
          
              <Provider store={store}>
                <Router>
                  <App />
                </Router>
              </Provider>
         
          </LeaveContextProvider>
        </AttendanceContextProvider>
      </WorkContextProvider>
    </ContextProvider>
  </EmployeeCountProvider>
</React.StrictMode>,








);