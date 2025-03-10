//Row Data InterFace
export interface IRow {
  ID: string;
  Label: string;
  Class: string;
  Department: string;
  Price: number;
  Cost: number;
}

export interface IRowStore {
  seqNo: number;
  id: string;
  label: string;
  city: string;
  state: string;
}
export interface IPlanning {
  Store: string;
  SKU: string;
  Week: string;
  SalesUnits: string;
}
export interface IPlanningMain {
  StoreLabel: string;
  Week: string;

  SKUName: string;
  SalesUnits: number;
  SalesDollars: number;
  GMDollars: number;
  GMPercent: string;
}
