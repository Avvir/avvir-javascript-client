import { SinonSpy } from "sinon";
import deepmerge from "deepmerge";

import { AvvirEvent, Vector2Like } from "../../source/typings/type_aliases";
import { FIREBASE } from "../../source/models/enums/user_auth_type";
import { SUPERADMIN } from "../../source/models/enums/user_role";

export const makeFakeDispatch = (dispatchSpy: SinonSpy, fakeGetState) => {
  const fakeDispatch = (action: AvvirEvent<any, any>) => {
    if (typeof action === "function") {
      // return action(fakeDispatch, fakeGetState, null);
    } else {
      return dispatchSpy(action);
    }
  };

  return fakeDispatch;
};
export const makeStoreContents = (store) => ({
  user: null,
  ...store,
});

export const makeStoreWithProject = (override) => {
  const canonical = makeStoreContents({
    user: {
      authType: FIREBASE,
      firebaseUser: {
        email: "some.email@avvir.io",
        idToken: "some-firebase.id.token",
        role: SUPERADMIN,
        uid: "some.email@avvir.io"
      }
    }
  });
  return deepmerge(canonical, override);
};

const falseGetter = () => false;
