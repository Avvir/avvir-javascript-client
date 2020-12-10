import moment from "moment";
import DateConverter from "../converters/date_converter";

const addInstantGetterAndSetterToApiModel = (modelInstance, propertyName) => {
  let dateVal;
  Object.defineProperty(modelInstance, propertyName, {
    get() {
      return dateVal;
    },
    set(val) {
      if (typeof val === "string") {
        dateVal = DateConverter.dateToInstant(moment(val, "MMM D, YYYY").toDate());
      } else if (val instanceof Date || moment.isMoment(val)) {
        dateVal = DateConverter.dateToInstant(val);
      } else {
        dateVal = val;
      }
    },
    enumerable: true
  });
};

export default addInstantGetterAndSetterToApiModel;
