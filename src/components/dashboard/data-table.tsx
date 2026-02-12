"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DATA } from "@/lib/data";
import { Shipment } from "@/lib/types";
import { t } from "@/lib/i18n";
import { useLang } from "./lang-context";
import { ArrowUpDown } from "lucide-react";

type SortKey = keyof Shipment;

export function DataTable() {
  const { lang } = useLang();
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortAsc, setSortAsc] = useState(false);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    let result = DATA;
    if (q) {
      result = result.filter((d) =>
        Object.values(d).some((v) => String(v).toLowerCase().includes(q))
      );
    }
    result = [...result].sort((a, b) => {
      const va = a[sortKey];
      const vb = b[sortKey];
      const strA = typeof va === "string" ? va.toLowerCase() : va;
      const strB = typeof vb === "string" ? vb.toLowerCase() : vb;
      if (strA < strB) return sortAsc ? -1 : 1;
      if (strA > strB) return sortAsc ? 1 : -1;
      return 0;
    });
    return result;
  }, [search, sortKey, sortAsc]);

  const columns: { key: SortKey; label: string }[] = [
    { key: "client", label: t(lang, "colClient") },
    { key: "incoterm", label: t(lang, "colIncoterm") },
    { key: "fcl", label: t(lang, "colFCL") },
    { key: "weight", label: t(lang, "colWeight") },
    { key: "product", label: t(lang, "colProduct") },
    { key: "pod", label: t(lang, "colPOD") },
    { key: "line", label: t(lang, "colLine") },
    { key: "date", label: t(lang, "colDate") },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          {t(lang, "tTable")}
        </CardTitle>
        <Input
          placeholder={t(lang, "searchPlaceholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm mt-2"
        />
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead
                  key={col.key}
                  className="cursor-pointer select-none hover:text-primary whitespace-nowrap"
                  onClick={() => handleSort(col.key)}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {sortKey === col.key && (
                      <ArrowUpDown className="h-3 w-3" />
                    )}
                  </span>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((d, i) => (
              <TableRow key={i}>
                <TableCell>{d.client}</TableCell>
                <TableCell>{d.incoterm}</TableCell>
                <TableCell>{d.fcl}&apos;</TableCell>
                <TableCell>{d.weight}</TableCell>
                <TableCell className="max-w-[200px] truncate">{d.product}</TableCell>
                <TableCell>{d.pod}</TableCell>
                <TableCell>{d.line}</TableCell>
                <TableCell>{d.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
