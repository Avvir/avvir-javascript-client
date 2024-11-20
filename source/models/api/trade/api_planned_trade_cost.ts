export class ApiPlannedTradeCost {
  constructor({
                tradeCode,
                unitOfMeasure,
                plannedUnitCost,
                plannedTotalCost,
                plannedQuantity
              }: Partial<ApiPlannedTradeCost> = {}) {
    this.tradeCode = tradeCode;
    this.unitOfMeasure = unitOfMeasure;
    this.plannedUnitCost = plannedUnitCost;
    this.plannedTotalCost = plannedTotalCost;
    this.plannedQuantity = plannedQuantity;
  }

  readonly tradeCode: string;
  unitOfMeasure: string;
  plannedUnitCost: number;
  plannedTotalCost: number;
  plannedQuantity: number;
}

export default ApiPlannedTradeCost;
