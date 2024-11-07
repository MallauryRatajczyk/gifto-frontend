import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
        images: [],
    },
};

export const imagesArticles = createSlice({
    name: 'imagesArticles',
    initialState,
    reducers: {
        addImage: (state, action) => {
            // rajouter un image
            state.value.images.push(action.payload);
        },
        removeImage: (state, action) => {
            // supprimer une image
            state.value.images = state.value.images.filter(e => e !== action.payload);
        },
        clearImages: (state) => {
            // Optional: Clear all images if needed
            state.value.images = [];
        },
    },
});

export const { addImage, removeImage, clearImages } = imagesArticles.actions;
export default imagesArticles.reducer;
