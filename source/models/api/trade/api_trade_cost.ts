export class ApiTradeCost {
  constructor({ tradeCode, unitOfMeasure, plannedUnitCost, plannedTotalCost, plannedQuantity, capturedQuantity, modeledQuantity, reportedQuantity }: Partial<ApiTradeCost> = {}) {
    this.tradeCode = tradeCode;
    this.unitOfMeasure = unitOfMeasure;
    this.plannedUnitCost = plannedUnitCost;
    this.plannedTotalCost = plannedTotalCost;
    this.plannedQuantity = plannedQuantity;
    this.capturedQuantity = capturedQuantity;
    this.modeledQuantity = modeledQuantity;
    this.reportedQuantity = reportedQuantity;
  }

  readonly tradeCode: string;
  unitOfMeasure: string;
  plannedUnitCost: number;
  plannedTotalCost: number;
  plannedQuantity: number;

  capturedQuantity: number;
  modeledQuantity: number;
  reportedQuantity: number;
}

export default ApiTradeCost;
