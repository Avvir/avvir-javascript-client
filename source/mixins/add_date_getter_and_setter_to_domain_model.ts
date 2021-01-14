import moment from "moment";
import DateConverter from "../converters/date_converter";

function addDateGetterAndSetterToDomainModel(target: Object, propertyName: string) {
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
}

export default addDateGetterAndSetterToDomainModel;
