
import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const initialState = {
  userData: null,
  selectedPost: null,
enterValue: null,
  favStocks: []

};

const userSlice = createSlice(
  {
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
    },
      setSelectedPost: (state, action) => {
        state.selectedPost = action.payload;
      },

      
      setInputValue: (state, action) => {
        state.enterValue = action.payload;
      }
  },
}

);

export const userInput = (state)=>{
  return state.localUser?.enterValue ;
  }

export const blogSelected = (state)=>{
  return state.localUser?.selectedPost ;
  }

export const selectUserData = (state) => {
  return state?.localUser?.userData;
};

const persistConfig = {
  key: 'user',
  storage,
};

const persistedReducer = persistReducer(persistConfig, userSlice.reducer);

export default persistedReducer;
export const { setUser ,setSelectedPost,setInputValue } = userSlice.actions;













