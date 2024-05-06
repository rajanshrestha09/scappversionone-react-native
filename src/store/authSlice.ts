import {createSlice} from '@reduxjs/toolkit';

export interface InitialState {
  status: boolean;
  user: {
    name: string;
    email: string;
  };
}

const initialState: InitialState = {
  status: false,
  user: {
    name: '',
    email: '',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.user = action.payload.user;
    },
    logout: state => {
      state.status = false;
      state.user = {
        name: '',
        email: '',
      };
    },
  },
});

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;
