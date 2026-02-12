"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DATA } from "@/lib/data";
import { CHART_COLORS } from "@/lib/chart-colors";
import {
  getMonthlyData,
  getClientData,
  getProductData,
  getDestinationData,
  getShippingLineData,
  getIncotermData,
} from "@/lib/aggregations";
import { t } from "@/lib/i18n";
import { useLang } from "./lang-context";

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="min-h-[420px] flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <ResponsiveContainer width="100%" height={350}>
          {children as React.ReactElement}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function ShipmentsByMonthChart() {
  const { lang } = useLang();
  const data = getMonthlyData(DATA, lang);
  return (
    <ChartCard title={t(lang, "tMonth")}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} className="fill-muted-foreground" />
        <YAxis tick={{ fontSize: 12 }} className="fill-muted-foreground" />
        <Tooltip />
        <Bar dataKey="shipments" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartCard>
  );
}

export function WeightByMonthChart() {
  const { lang } = useLang();
  const data = getMonthlyData(DATA, lang);
  return (
    <ChartCard title={t(lang, "tWeightMonth")}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} className="fill-muted-foreground" />
        <YAxis tick={{ fontSize: 12 }} className="fill-muted-foreground" />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="weight"
          stroke="var(--color-chart-2)"
          strokeWidth={2.5}
          dot={{ r: 5, fill: "var(--color-chart-2)" }}
        />
      </LineChart>
    </ChartCard>
  );
}

export function ClientsByShipmentsChart() {
  const { lang } = useLang();
  const { byCount } = getClientData(DATA);
  return (
    <ChartCard title={t(lang, "tClients")}>
      <BarChart data={byCount} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis type="number" tick={{ fontSize: 12 }} className="fill-muted-foreground" />
        <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 11 }} className="fill-muted-foreground" />
        <Tooltip />
        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
          {byCount.map((_, i) => (
            <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ChartCard>
  );
}

export function WeightByClientChart() {
  const { lang } = useLang();
  const { byWeight } = getClientData(DATA);
  return (
    <ChartCard title={t(lang, "tWeightClient")}>
      <BarChart data={byWeight} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis type="number" tick={{ fontSize: 12 }} className="fill-muted-foreground" />
        <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 11 }} className="fill-muted-foreground" />
        <Tooltip />
        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
          {byWeight.map((_, i) => (
            <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ChartCard>
  );
}

export function ProductMixChart() {
  const { lang } = useLang();
  const data = getProductData(DATA, lang);
  return (
    <ChartCard title={t(lang, "tProduct")}>
      <PieChart>
        <Tooltip />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="45%"
          innerRadius={60}
          outerRadius={120}
          paddingAngle={3}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ChartCard>
  );
}

export function DestinationsChart() {
  const { lang } = useLang();
  const data = getDestinationData(DATA);
  return (
    <ChartCard title={t(lang, "tDest")}>
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis type="number" tick={{ fontSize: 12 }} className="fill-muted-foreground" />
        <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 11 }} className="fill-muted-foreground" />
        <Tooltip />
        <Bar dataKey="value" fill="var(--color-chart-2)" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ChartCard>
  );
}

export function ShippingLinesChart() {
  const { lang } = useLang();
  const data = getShippingLineData(DATA);
  return (
    <ChartCard title={t(lang, "tLines")}>
      <PieChart>
        <Tooltip />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="45%"
          innerRadius={60}
          outerRadius={120}
          paddingAngle={2}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ChartCard>
  );
}

export function IncotermsChart() {
  const { lang } = useLang();
  const data = getIncotermData(DATA);
  return (
    <ChartCard title={t(lang, "tIncoterms")}>
      <PieChart>
        <Tooltip />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="45%"
          outerRadius={120}
          paddingAngle={3}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ChartCard>
  );
}
