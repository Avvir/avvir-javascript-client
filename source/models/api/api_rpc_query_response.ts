export class ApiRpcQueryResponse {
  queryId: number;
  result: object;
  statusCode: number;
  message: string;

  constructor({ queryId, result, statusCode, message }: Partial<ApiRpcQueryResponse>) {
    this.queryId = queryId;
    this.result = result;
    this.statusCode = statusCode;
    this.message = message;
  }
}

export default ApiRpcQueryResponse;