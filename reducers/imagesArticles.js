import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    value: {
        images: null,
       
    },
};

export const imagesArticles = createSlice({
    name: 'imagesArticles',
    initialState,
    reducers: {
        addImage: (state, action) => {
            state.value.images = action.payload;
        },
        removeImage: (state, action) => {
            state.value.images = state.value.images.filter(e => e !==action.payload ) 
        },
    },
});

export const { addImage, removeImage } = imagesArticles.actions;
export default imagesArticles.reducer;