import moment from "moment";
import DateConverter from "../converters/date_converter";
import {DateLike} from "type_aliases";

export function addDateGetterAndSetterToDomainModel(target: Object, propertyName: string, initialValue?: DateLike) {
  let dateVal;
  Object.defineProperty(target, propertyName, {
    get() {
      return dateVal;
    },
    set(val) {
      if (typeof val === "string") {
        dateVal = moment(val, "MMM D, YYYY").toDate();
      } else if (val instanceof Date) {
        dateVal = val;
      } else if (moment.isMoment(val)) {
        val.toDate();
      } else {
        dateVal = DateConverter.instantToDate(val) || DateConverter.millisecondsToDate(val) || null;
      }
    },
    enumerable: true
  });

  if (initialValue) {
    target[propertyName] = initialValue;
  }
}

export default addDateGetterAndSetterToDomainModel;
