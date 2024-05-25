import api from "../../config/api";

const staffService = {
    fetchStaffList: async () => {
        return await api.post('/staff/list');
    },

    createStaff: async (newStaff) => {
        return await api.post('/staff/add', {...newStaff});
    },

    editStaff: async (editedStaff) => {
        console.log(editedStaff)
        return await api.put(`/staff/edit`, {...editedStaff});
    },

    deleteStaff: async (staffId) => {
        return await api.delete(`/staff/delete?id=${staffId}`);
    },
};

export default staffService;