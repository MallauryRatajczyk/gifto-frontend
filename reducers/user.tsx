import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserState = {
    value: {
        email: string | null;
        token: string | null;
    };
};

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
        toConnectUser: (state: UserState, action: PayloadAction<string>) => {
            state.value.token = action.payload;
        },
    },
});

export const { toConnectUser } = connectUser.actions;
export default connectUser.reducer;
