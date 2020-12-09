import apiFailure from "../../events/notifications/failures/api_failure";
import { Dispatch, EventCreator } from "type_aliases";

type DefaultErrorCallbackEvent<Type extends string, Payload> = EventCreator<Type, Payload> | typeof apiFailure

const getErrorCallback = <Type extends string, Payload>(dispatch: Dispatch<ReturnType<DefaultErrorCallbackEvent<Type, Payload>>>, throwError: boolean = true, event: DefaultErrorCallbackEvent<Type, Payload> = apiFailure): (error: Error) => never => {
  return ((error) => {
    dispatch(event(error));
    if (throwError) {
      throw error;
    }
  }) as (error: Error) => never;
};

export default getErrorCallback;
