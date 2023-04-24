import moment from "moment";

import DateConverter from "../converters/date_converter";
import { DateLike } from "../models";

export function addInstantGetterAndSetterToApiModel(modelInstance: Object,
                                                    propertyName: string,
                                                    initialValue?: DateLike)
{
  let dateVal;
  Object.defineProperty(modelInstance, propertyName, {
    get() {
      return dateVal;
    },
    set(val) {
      if (typeof val === "string") {
        const date = moment(val, "MMM D, YYYY").utc(true).toDate();
        if (DateConverter.isValidDate(date)) {
          dateVal = DateConverter.dateToInstant(date);
        } else {
          dateVal = null;
        }
      } else if (val instanceof Date) {
        dateVal = DateConverter.dateToInstant(val);
      } else if (moment.isMoment(val)) {
        dateVal = DateConverter.dateToInstant(val.toDate());
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
