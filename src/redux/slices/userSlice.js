import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  isRemovingIds: {},
};

const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    addUser: (state, action) => {
      return { ...state, users: [...state.users, action.payload] };
    },
    addUsers: (state, action) => {
      return { ...state, users: [...state.users, ...action.payload] };
    },
    removeUser: (state, action) => {
      return {
        ...state,
        users: state.users.filter((item) => item.Id !== action.payload),
      };
    },
    setIsRemovingId: (state, action) => {
      console.log(action, "action");
      return {
        ...state,
        isRemovingIds: {
          ...state.isRemovingIds,
          [action.payload.Id]: action.payload.value,
        },
      };
    },
  },
});

export const { addUser, addUsers, removeUser, setIsRemovingId } =
  userSlice.actions;
export default userSlice.reducer;
