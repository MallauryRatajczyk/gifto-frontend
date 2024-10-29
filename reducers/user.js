import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    value: {
        email: null,
        token: null
    },
};

export const connectUser = createSlice({
    name: 'user',
    initialState,
    reducers: {
        toConnectUser: (state, action) => {
            state.value.token = action.payload;
        },
    },
});

export const { toConnectUser } = connectUser.actions;
export default connectUser.reducer;
