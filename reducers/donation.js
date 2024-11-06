import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
        donations: [],
    },
};

export const handleDonation = createSlice({
    name: 'makeDonation',
    initialState,
    reducers: {
        addDonation: (state, action) => {
            state.value.donations.push(action.payload);
        },
        removeDonation: (state, action) => {
            state.value.donations = state.value.donations.filter(e => e !== action.payload);
        },
        
    },
});

export const { addDonation, removeDonation} = handleDonation.actions;
export default handleDonation.reducer;
