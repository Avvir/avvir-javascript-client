import _ from "underscore";

const serializeForm = (form: { [k: string]: string | boolean | number }) => {
  return _(form).reduce((piecesSoFar, value: string | boolean | number, field) => {
    piecesSoFar.push(`${encodeURIComponent(field)}=${encodeURIComponent(value)}`);
    return piecesSoFar;
  }, [] as string[]).join("&");
};

export default serializeForm;
