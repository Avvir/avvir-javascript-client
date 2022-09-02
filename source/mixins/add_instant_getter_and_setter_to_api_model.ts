import moment from "moment";
import DateConverter from "../converters/date_converter";
import {DateLike} from "type_aliases";

export function addInstantGetterAndSetterToApiModel(modelInstance: Object, propertyName: string, initialValue?: DateLike) {
  let dateVal;
  Object.defineProperty(modelInstance, propertyName, {
    get() {
      return dateVal;
    },
    set(val) {
      if (typeof val === "string") {
        dateVal = DateConverter.dateToInstant(moment(val, "MMM D, YYYY").utc(true));
      } else if (val instanceof Date || moment.isMoment(val)) {
        dateVal = DateConverter.dateToInstant(val);
      } else {
        dateVal = val;
      }
    },
    enumerable: true,
    configurable: true
  });

  if (initialValue) {
    modelInstance[propertyName] = initialValue;
  }
}

export default addInstantGetterAndSetterToApiModel;
