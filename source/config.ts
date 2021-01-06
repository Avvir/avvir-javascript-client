export default class Config {
  static sharedErrorHandler: any = ({error}) => {
    throw error;
  }
}
