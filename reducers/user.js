import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    value: {
        email: null,
        token: null,
        username: null
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
        },
    },
});

export const { toConnectUser } = connectUser.actions;
export default connectUser.reducer;
