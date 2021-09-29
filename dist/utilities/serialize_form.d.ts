declare const serializeForm: (form: {
    [k: string]: string | number | boolean;
}) => string;
export default serializeForm;
