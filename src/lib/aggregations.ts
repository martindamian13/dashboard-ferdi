import { Shipment } from "./types";

const MONTH_NAMES_ES = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
const MONTH_NAMES_EN = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export function getMonthNames(lang: string) {
  return lang === "es" ? MONTH_NAMES_ES : MONTH_NAMES_EN;
}

export function countBy<K extends keyof Shipment>(data: Shipment[], key: K) {
  const map: Record<string, number> = {};
  for (const d of data) {
    const k = String(d[key]);
    map[k] = (map[k] || 0) + 1;
  }
  return map;
}

export function sumBy(data: Shipment[], groupKey: keyof Shipment, sumKey: keyof Shipment) {
  const map: Record<string, number> = {};
  for (const d of data) {
    const k = String(d[groupKey]);
    map[k] = (map[k] || 0) + (d[sumKey] as number);
  }
  return map;
}

export function sortedEntries(obj: Record<string, number>, desc = true) {
  return Object.entries(obj).sort((a, b) => (desc ? b[1] - a[1] : a[1] - b[1]));
}

export function monthIndex(date: string) {
  return new Date(date).getMonth();
}

export function getMonthlyData(data: Shipment[], lang: string) {
  const months = getMonthNames(lang);
  const countMap: Record<number, number> = {};
  const weightMap: Record<number, number> = {};

  for (const d of data) {
    const m = monthIndex(d.date);
    countMap[m] = (countMap[m] || 0) + 1;
    weightMap[m] = (weightMap[m] || 0) + d.weight;
  }

  const keys = Object.keys(countMap).map(Number).sort((a, b) => a - b);
  return keys.map((m) => ({
    month: months[m],
    shipments: countMap[m],
    weight: Math.round(weightMap[m] * 10) / 10,
  }));
}

export function getClientData(data: Shipment[]) {
  const counts = sortedEntries(countBy(data, "client"));
  const weights = sortedEntries(sumBy(data, "client", "weight"));
  return {
    byCount: counts.map(([name, value]) => ({ name, value })),
    byWeight: weights.map(([name, value]) => ({ name, value: Math.round(value * 10) / 10 })),
  };
}

export function getProductData(data: Shipment[], lang: string) {
  const labels: Record<string, Record<string, string>> = {
    es: {
      "BULK CHIA SEEDS BLACK CONVENTIONAL": "Chia Convencional",
      "ORGANIC BLACK CHIA SEEDS": "Chia Organica",
      PET: "PET",
    },
    en: {
      "BULK CHIA SEEDS BLACK CONVENTIONAL": "Conventional Chia",
      "ORGANIC BLACK CHIA SEEDS": "Organic Chia",
      PET: "PET",
    },
  };
  const counts = countBy(data, "product");
  return Object.entries(counts).map(([key, value]) => ({
    name: labels[lang]?.[key] ?? key,
    value,
  }));
}

export function getDestinationData(data: Shipment[], limit = 12) {
  return sortedEntries(countBy(data, "pod"))
    .slice(0, limit)
    .map(([name, value]) => ({ name, value }));
}

export function getShippingLineData(data: Shipment[]) {
  const raw = countBy(data, "line");
  const normalized: Record<string, number> = {};
  for (const [k, v] of Object.entries(raw)) {
    const nk = k.toUpperCase();
    normalized[nk] = (normalized[nk] || 0) + v;
  }
  return sortedEntries(normalized).map(([name, value]) => ({ name, value }));
}

export function getIncotermData(data: Shipment[]) {
  const counts = countBy(data, "incoterm");
  return Object.entries(counts).map(([name, value]) => ({ name, value }));
}

export function getKPIs(data: Shipment[]) {
  return {
    totalShipments: data.length,
    totalWeight: Math.round(data.reduce((s, d) => s + d.weight, 0) * 10) / 10,
    uniqueClients: new Set(data.map((d) => d.client)).size,
    uniqueDestinations: new Set(data.map((d) => d.pod)).size,
    fcl40: data.filter((d) => d.fcl === 40).length,
    fcl20: data.filter((d) => d.fcl === 20).length,
  };
}
