import {createSlice} from '@reduxjs/toolkit';
import {fetchStaffList, createStaff, editStaff, deleteStaff} from '../thunk/StaffThunk';

const initialState = {
    staffList: [],
    count: 0,
    isLoading: false,
    error: null,
};
const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStaffList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchStaffList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.staffList = action.payload.staffList;
                state.count = action.payload.count;


            })
            .addCase(fetchStaffList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(createStaff.pending, (state) => {
                state.isLoading = true;

            })
            .addCase(createStaff.fulfilled, (state, action) => {
                // Add the new staff member to the state
                state.isLoading = false;
                const newStaff = action.payload;
                console.log(action)
                console.log(newStaff)
                // state.staffList.push(newStaff);
            })
            .addCase(createStaff.rejected, (state, action) => {
                state.isLoading = false;

                state.error = action.error.message;
            })

            .addCase(editStaff.fulfilled, (state, action) => {
                // Update the state with the edited staff member
                const editedStaff = action.payload;
                state.staffList = state.staffList.map((staff) =>
                    staff.id === editedStaff.id ? editedStaff : staff
                );
            })
            .addCase(deleteStaff.fulfilled, (state, action) => {
                // Remove the deleted staff member from the state
                const staffId = action.payload;
                state.staffList = state.staffList.filter((staff) => staff.id !== staffId);
            });
    },
});

export default staffSlice.reducer;