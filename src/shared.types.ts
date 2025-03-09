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
