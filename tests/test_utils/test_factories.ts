import { SinonSpy } from "sinon";
import moment from "moment";
import deepmerge from "deepmerge";
import _ from "underscore";

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

export const makeFakeEvent = (target?: HTMLElement): Event => {
  const eventTarget = target || document.createElement("div");
  return {
    bubbles: true,
    cancelBubble: false,
    cancelable: true,
    currentTarget: eventTarget,
    defaultPrevented: false,
    eventPhase: 0,
    initEvent: _.noop,
    isTrusted: false,
    returnValue: false,
    srcElement: undefined,
    target: eventTarget,
    timeStamp: 0,
    type: "",
    preventDefault: _.noop,
    stopImmediatePropagation: _.noop,
    stopPropagation: _.noop
  } as unknown as Event;
};

export type MouseEventOptions = {
  button?: "left" | "right" | "middle" | "back" | "forward"
  altKey?: boolean
  ctrlKey?: boolean
  metaKey?: boolean
  shiftKey?: boolean
  region?: string
}

const buttonType = {
  left: 0,
  right: 2,
  middle: 1,
  back: 3,
  forward: 4
};

export const makeFakeMouseEvent = (coordinates?: Vector2Like, target?: HTMLElement, options: MouseEventOptions = {}): MouseEvent => {
  return {
    ...makeFakeEvent(target),
    button: buttonType[options.button || 0],
    altKey: options.altKey || false,
    ctrlKey: options.ctrlKey || false,
    metaKey: options.metaKey || false,
    shiftKey: options.shiftKey || false,
    offsetX: coordinates?.x || 0,
    offsetY: coordinates?.y || 0,
    clientX: coordinates?.x || 0,
    clientY: coordinates?.y || 0,
    pageX: coordinates?.x || 0,
    pageY: coordinates?.y || 0,
    screenX: coordinates?.x || 0,
    screenY: coordinates?.y || 0,
  } as MouseEvent;
};
