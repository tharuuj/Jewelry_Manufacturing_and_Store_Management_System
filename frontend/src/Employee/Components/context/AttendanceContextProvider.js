import React, { createContext, useState } from 'react'

export const addAttendanceData = createContext();
export const updateAttendanceData = createContext();
export const dltattendancedata = createContext();

const AttendanceContextProvider = ({ children }) => {

    const [attendanceadd, setAttendanceadd] = useState("");
    const [attendanceupdate, setAttendancUpdate] = useState("");
    const [deleteattendancedata, setDltAttendancedata] = useState("");

    return (
        <>
            <addAttendanceData.Provider value={{ attendanceadd, setAttendanceadd }}>
                <updateAttendanceData.Provider value={{ attendanceupdate, setAttendancUpdate }}>
                    <dltattendancedata.Provider value={{ deleteattendancedata, setDltAttendancedata }}>
                        {children}
                    </dltattendancedata.Provider>
                </updateAttendanceData.Provider>
            </addAttendanceData.Provider>
        </>
    )
}

export default AttendanceContextProvider