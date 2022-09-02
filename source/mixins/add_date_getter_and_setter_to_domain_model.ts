import moment from "moment";

import DateConverter from "../converters/date_converter";
import { DateLike } from "type_aliases";

export function addDateGetterAndSetterToDomainModel(target: Object, propertyName: string, initialValue?: DateLike) {
  let dateVal: Date;
  Object.defineProperty(target, propertyName, {
    get() {
      return dateVal;
    },
    set(val: DateLike) {
      if (typeof val === "string") {
        dateVal = moment(val, "MMM D, YYYY").utc(true).toDate();
      } else if (val instanceof Date) {
        dateVal = val;
      } else if (moment.isMoment(val)) {
        dateVal = val.toDate();
      } else {
        dateVal = DateConverter.instantToDate(val) || moment.invalid().toDate();
      }
    },
    enumerable: true
  });

  if (initialValue) {
    target[propertyName] = initialValue;
  }
}

export default addDateGetterAndSetterToDomainModel;
