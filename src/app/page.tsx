"use client";

import { LangProvider } from "@/components/dashboard/lang-context";
import { Header } from "@/components/dashboard/header";
import { KPICards } from "@/components/dashboard/kpi-cards";
import {
  ShipmentsByMonthChart,
  WeightByMonthChart,
  ClientsByShipmentsChart,
  WeightByClientChart,
  ProductMixChart,
  DestinationsChart,
  ShippingLinesChart,
  IncotermsChart,
} from "@/components/dashboard/charts";
import { DataTable } from "@/components/dashboard/data-table";

export default function Home() {
  return (
    <LangProvider>
      <main className="min-h-screen p-5 md:p-8">
        <Header />
        <KPICards />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-7">
          <ShipmentsByMonthChart />
          <WeightByMonthChart />
          <ClientsByShipmentsChart />
          <WeightByClientChart />
          <ProductMixChart />
          <DestinationsChart />
          <ShippingLinesChart />
          <IncotermsChart />
        </div>
        <DataTable />
      </main>
    </LangProvider>
  );
}
