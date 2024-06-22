import React, { createContext, useState } from 'react'

export const addLeaveData = createContext();
export const updateLeaveData = createContext();
export const dltleavedata = createContext();

const LeaveContextProvider = ({ children }) => {

    const [leaveadd, setLeaveadd] = useState("");
    const [updateleave, setLeaveUpdate] = useState("");
    const [deleteleavedata, setDltLeavedata] = useState("");

    return (
        <>
            <addLeaveData.Provider value={{ leaveadd, setLeaveadd }}>
                <updateLeaveData.Provider value={{ updateleave, setLeaveUpdate }}>
                    <dltleavedata.Provider value={{ deleteleavedata, setDltLeavedata }}>
                        {children}
                    </dltleavedata.Provider>
                </updateLeaveData.Provider>
            </addLeaveData.Provider>
        </>
    )
}

export default LeaveContextProvider



