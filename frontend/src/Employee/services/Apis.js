import {commonrequest} from "./ApiCall"
import {BASE_URL} from "./helper"



export const empregisterfunc = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/employee/registeremp`,data,header);
}

export const employeegetfunc = async(search, empgender, status, sort, page)=>{
    return await commonrequest("GET",`${BASE_URL}/employee/details?search=${search}&empgender=${empgender}&status=${status}&sort=${sort}&page=${page}`,"");
}

export const singleEmployeegetfunc = async(id)=>{
    return await commonrequest("GET",`${BASE_URL}/employee/${id}`,"");
}

export const editfunc = async(id,data,header)=>{
    return await commonrequest("PUT",`${BASE_URL}/employee/edit/${id}`,data,header);
}

export const deletefunc = async(id)=>{
    return await commonrequest("DELETE",`${BASE_URL}/employee/delete/${id}`,{});
}

export const statuschangefunc = async(id,data)=>{
    return await commonrequest("PUT",`${BASE_URL}/employee/status/${id}`,{data})
}

export const exporttocsvfunc = async()=>{
    return await commonrequest("GET",`${BASE_URL}/employeeexport`,"");
}

export const fetchEmployeeCount = async () => {
    try {
      const response = await commonrequest("GET", `${BASE_URL}/employeescount`);
      return response.data.count || 0;
    } catch (error) {
      console.error('Error fetching employee count:', error);
      throw error;
    }
  };


//Work History -----------------------------------------------------------------------------------------
export const empworkhistoryfunc = async(data)=>{
    return await commonrequest("POST",`${BASE_URL}/workhistory/addwork`,data);
}

export const workhistorygetfunc = async(search, workstatus, sort, page)=>{
    return await commonrequest("GET",`${BASE_URL}/workhistory/workdetails?search=${search}&workstatus=${workstatus}&sort=${sort}&page=${page}`,"");
}

export const workstatuschangefunc = async(id,data)=>{
    return await commonrequest("PUT",`${BASE_URL}/workhistory/workstatus/${id}`,{data})
}

export const singleWorkHistorygetfunc = async(id)=>{
    return await commonrequest("GET",`${BASE_URL}/workhistory/${id}`,"");
}

export const editworkhistoryfunc = async(id,data)=>{
    return await commonrequest("PUT",`${BASE_URL}/workhistory/edit/${id}`,data);
}

export const deleteworkhistoryfunc = async(id)=>{
    return await commonrequest("DELETE",`${BASE_URL}/workhistory/delete/${id}`,{});
}


//Attendance --------------------------------------------------------------------------------------------

export const empattendancefunc = async(data)=>{
    return await commonrequest("POST",`${BASE_URL}/attendance/addattendance`,data);
}

export const fetchEmployeeIds = async () => {
    try {
        const response = await commonrequest("GET", `${BASE_URL}/employees`);
        
        const data = response.data; // Access the data from the response
        return data.employeeIds || []; // Assuming your API returns an array of employee IDs under the key 'employeeIds'
    } catch (error) {
        console.error('Error fetching employee IDs:', error);
        throw error;
    }
};


export const attendancegetfunc = async (search, datecreated, sort, page) => {
    // Check if datecreated is null, and adjust the URL accordingly
    const dateQueryParam = datecreated !== null ? `&datecreated=${datecreated.toISOString()}` : '';
    const url = `${BASE_URL}/attendance/attdetails?search=${search}${dateQueryParam}&sort=${sort}&page=${page}`;

    return await commonrequest("GET", url, "");
}

export const singleAttendancegetfunc = async(id)=>{
    return await commonrequest("GET",`${BASE_URL}/attendance/${id}`,"");
}

export const editattendancefunc = async(id,data)=>{
    return await commonrequest("PUT",`${BASE_URL}/attendance/edit/${id}`,data);
}

export const deleteattendancefunc = async(id)=>{
    return await commonrequest("DELETE",`${BASE_URL}/attendance/delete/${id}`,{});
}


export const fetchAggregatedAttendance = async () => {
    try {
      // Make a GET request to the backend API endpoint for aggregated attendance data
      const response = await commonrequest("GET", `${BASE_URL}/aggregatedatt`);
  
      // Extract the dates and counts data from the response
      const { dates, counts } = response.data;
  
      // Return the extracted data
      return { dates, counts };
    } catch (error) {
      // Handle any errors
      console.error('Error fetching aggregated attendance:', error);
      throw error;
    }
  };


//Leaves -----------------------------------------------------------------------------------------
export const empleavefunc = async(data)=>{
    return await commonrequest("POST",`${BASE_URL}/leave/addleave`,data);
}

export const leavegetfunc = async(search, page)=>{
    return await commonrequest("GET",`${BASE_URL}/leave/leavedetails?search=${search}&page=${page}`,"");
}

export const editleavefunc = async(id,data)=>{
    return await commonrequest("PUT",`${BASE_URL}/leave/edit/${id}`,data);
}

export const deleteleavefunc = async(id)=>{
    return await commonrequest("DELETE",`${BASE_URL}/leave/delete/${id}`,{});
}
