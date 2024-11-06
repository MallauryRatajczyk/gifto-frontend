import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
        userItems: [],
        loading: false,
        error: null,
    },
};

export const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        setUserItems: (state, action) => {
            state.value.userItems = action.payload;
        },
        setLoading: (state, action) => {
            state.value.loading = action.payload;
        },
        setError: (state, action) => {
            state.value.error = action.payload;
        },
        addUserItem: (state, action) => {
            state.value.userItems.push(action.payload);
        },
        removeUserItem: (state, action) => {
            state.value.userItems = state.value.userItems.filter(
                item => item._id !== action.payload
            );
        },
    },
});

export const { setUserItems, setLoading, setError, addUserItem, removeUserItem } = itemsSlice.actions;
export default itemsSlice.reducer;