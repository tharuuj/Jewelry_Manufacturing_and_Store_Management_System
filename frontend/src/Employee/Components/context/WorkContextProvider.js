import React, { createContext, useState } from 'react'

export const addWorkData = createContext();
export const updateWorkHistoryData = createContext();
export const dltworkhistorydata = createContext();

const WorkContextProvider = ({ children }) => {

    const [workhistoryadd, setWorkHistoryadd] = useState("");
    const [updateworkhistory, setWorkHistoryUpdate] = useState("");
    const [deleteworkhistorydata, setDltWorkHistorydata] = useState("");

    return (
        <>
            <addWorkData.Provider value={{ workhistoryadd, setWorkHistoryadd }}>
                <updateWorkHistoryData.Provider value={{ updateworkhistory, setWorkHistoryUpdate }}>
                    <dltworkhistorydata.Provider value={{ deleteworkhistorydata, setDltWorkHistorydata }}>
                        {children}
                    </dltworkhistorydata.Provider>
                </updateWorkHistoryData.Provider>
            </addWorkData.Provider>
        </>
    )
}

export default WorkContextProvider



