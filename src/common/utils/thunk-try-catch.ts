import { AppDispatch, AppRootStateType } from "app/store";
import { handleServerNetworkError } from "common/utils/handle-server-network-error";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { appActions } from "app/app.reducer";
import { ResponseType } from "common/types";

/**
 Executes the provided logic function inside a try-catch block and handles potential errors and loading status changes.

 *  * @template T, A
 *  * @param {BaseThunkAPI<AppRootStateType, any, AppDispatch, null | ResponseType>} thunkAPI - The Redux Toolkit BaseThunkAPI object.
 *  * @param {Function} logic - The logic function to be executed inside the try block.
 *  * @returns {Promise<T | null>} - A promise that resolves to the return value of the logic function, or null if an error occurred.
 *  * @throws {Error} - If an error is thrown by the logic function.
 */

export const thunkTryCatch = async (
  thunkAPI: BaseThunkAPI<AppRootStateType, unknown, AppDispatch, null | ResponseType>,
  logic: Function
) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    return await logic();
  } catch (e) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  } finally {
    dispatch(appActions.setAppStatus({ status: "idle" }));
  }
};
