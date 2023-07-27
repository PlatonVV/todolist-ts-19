import { Dispatch } from "redux";
import { appActions } from "app/app.reducer";
import { ResponseType } from "common/types/common.types";

/**
 * Handles server application errors and dispatches corresponding actions.
 *
 * @template D - The type of data expected in the response.
 * @param {ResponseType<D>} data - The response data received from the server.
 * @param {Dispatch} dispatch - The dispatch function from Redux to trigger actions.
 * @param {boolean} [showError=true] - A flag indicating whether to show the error message or not. Default is true.
 * @returns - void
 */

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch, showError: boolean = true) => {
  if (showError) {
    dispatch(appActions.setAppError({ error: data.messages.length ? data.messages[0] : "Some error occurred" }));
  }
  dispatch(appActions.setAppStatus({ status: "failed" }));
};
