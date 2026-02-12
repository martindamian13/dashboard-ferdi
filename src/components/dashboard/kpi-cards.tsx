"use client";

import { Card, CardContent } from "@/components/ui/card";
import { DATA } from "@/lib/data";
import { getKPIs } from "@/lib/aggregations";
import { t } from "@/lib/i18n";
import { useLang } from "./lang-context";

const kpis = getKPIs(DATA);

export function KPICards() {
  const { lang } = useLang();

  const items = [
    { value: kpis.totalShipments, label: t(lang, "kpiShipments") },
    { value: kpis.totalWeight.toLocaleString(), label: t(lang, "kpiWeight") },
    { value: kpis.uniqueClients, label: t(lang, "kpiClients") },
    { value: kpis.uniqueDestinations, label: t(lang, "kpiDest") },
    { value: kpis.fcl40, label: t(lang, "kpiFCL40") },
    { value: kpis.fcl20, label: t(lang, "kpiFCL20") },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-7">
      {items.map((item) => (
        <Card key={item.label} className="hover:-translate-y-0.5 transition-transform">
          <CardContent className="pt-5 pb-4 text-center">
            <div className="text-3xl font-extrabold bg-gradient-to-br from-primary to-chart-2 bg-clip-text text-transparent">
              {item.value}
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1 font-medium">
              {item.label}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
