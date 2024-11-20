export class ApiCapturedTradeCost {
  constructor({ tradeCode, capturedQuantity, modeledQuantity }: Partial<ApiCapturedTradeCost> = {}) {
    this.tradeCode = tradeCode;
    this.capturedQuantity = capturedQuantity;
    this.modeledQuantity = modeledQuantity;
  }

  readonly tradeCode: string;
  capturedQuantity: number;
  modeledQuantity: number;
}

export default ApiCapturedTradeCost;
