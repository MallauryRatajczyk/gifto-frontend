import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    value: {
        email: null,
        token: null,
        username: null,
        firstName: null, // Add firstName to the initial state
        imageUrl: null,
    },
};

export const connectUser = createSlice({
    name: 'user',
    initialState,
    reducers: {
        toConnectUser: (state, action) => {
            state.value.email = action.payload.email;
            state.value.token = action.payload.token;
            state.value.username = action.payload.username;
            state.value.firstName = action.payload.firstName; // Store firstName
            state.value.imageUrl = action.payload.imageUrl; // Store image URL
        },
        updateProfileImage: (state, action) => {
            state.value.imageUrl = action.payload.imageUrl; // Separate action to update only imageUrl
        },
    },
});

export const { toConnectUser } = connectUser.actions;
export default connectUser.reducer;
