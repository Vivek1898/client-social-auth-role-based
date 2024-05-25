import {createAsyncThunk} from '@reduxjs/toolkit';
import staffService from "../../redux/actions/StaffAction";

export const fetchStaffList = createAsyncThunk('staff/fetchStaffList', async () => {
    const response = await staffService.fetchStaffList();
    return response?.data?.data;
});

export const createStaff = createAsyncThunk('staff/createStaff', async (newStaff) => {
    const response = await staffService.createStaff(newStaff);
    return response.data;
});

export const editStaff = createAsyncThunk('staff/editStaff', async (editedStaff) => {
    const response = await staffService.editStaff(editedStaff);
    return response.status === 200 ? editedStaff : response;
});

export const deleteStaff = createAsyncThunk('staff/deleteStaff', async (staffId) => {
    await staffService.deleteStaff(staffId);
    return staffId;
});

