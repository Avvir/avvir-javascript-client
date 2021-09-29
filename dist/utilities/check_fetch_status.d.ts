declare const checkFetchStatus: <R extends string | {}>(response: Response) => Promise<R>;
export default checkFetchStatus;
