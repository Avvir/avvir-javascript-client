export default class Config {
  static sharedErrorHandler: any = ({error, action}) => {
    throw error;
  }
}
