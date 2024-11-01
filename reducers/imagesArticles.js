import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
        images: [], // Initialize as an empty array to store multiple images
    },
};

export const imagesArticles = createSlice({
    name: 'imagesArticles',
    initialState,
    reducers: {
        addImage: (state, action) => {
            // Append the new image URL to the existing images array
            state.value.images.push(action.payload);
        },
        removeImage: (state, action) => {
            // Remove the specified image URL from the images array
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
