import { createSlice } from "@reduxjs/toolkit";
import moment from "moment-timezone";

/* Right now month looks for current month. If you want to start at All then you need to input 0 */

export const yearSlice = createSlice({
  name: "date",
  initialState: {
    year: `${moment().tz("America/Chicago").year()}`,
    month: `${moment().tz("America/Chicago").month() + 1}`,
    overviewDate: moment().tz("America/Chicago").format("YYYY-MM-DD"),
  },
  reducers: {
    changeYear: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // state.value = state;
      state.year = action.payload;
    },
    changeMonth: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // state.value = state;
      state.month = action.payload;
    },
    changeOverviewDate: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // state.value = state;
      state.overviewDate = action.payload;
    },
  },
});

export const { changeYear, changeMonth, changeOverviewDate } =
  yearSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(changeYearAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const changeYearAsync = (amount) => (dispatch) => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.year.value)`
export const selectYear = (state) => state.date.year;
export const selectMonth = (state) => state.date.month;
export const selectOverviewDate = (state) => state.date.overviewDate;

export default yearSlice.reducer;
