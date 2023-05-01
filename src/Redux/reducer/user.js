import {createSlice} from '@reduxjs/toolkit';

const userInitialState = {
  userData: {},
  login: false,
};

export const userSlice = createSlice({
  name: 'userData',
  initialState: userInitialState,
  reducers: {
    setUser(state, action) {
      const user = action.payload;
      return {...state, userData: user, login: true};
    },
    removeUser() {
      return userInitialState;
    },
  },
});

export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;
