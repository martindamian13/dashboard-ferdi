export interface Shipment {
  client: string;
  incoterm: string;
  fcl: number;
  weight: number;
  product: string;
  pod: string;
  line: string;
  date: string;
}

export type Lang = "es" | "en";
