"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Info } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { holdings } from "@/data/holdings";
import { preHarvest, afterHarvest } from "@/data/summary";
import { disclaimer } from "@/data/disclaimer";

export default function Home() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [data, setData] = useState(holdings);

  const toggleRow = (index: number) => {
    setSelectedRows((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const handleSort = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);

    const sorted = [...data].sort((a, b) =>
      newOrder === "asc"
        ? a.shortNum - b.shortNum
        : b.shortNum - a.shortNum
    );

    setData(sorted);
  };

  return (
    <main className="p-6 bg-gray-100 min-h-screen space-y-6">

      {/* Header */}
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-semibold">Tax Harvesting</h1>

        <Tooltip>
          <TooltipTrigger asChild>
            <span className="text-blue-600 underline cursor-pointer text-sm hover:text-blue-800">
              How it works?
            </span>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs text-sm">
            Tax loss harvesting helps reduce taxable gains.
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Accordion */}
      <Accordion type="single" collapsible>
        <AccordionItem className="border rounded-lg bg-blue-50 px-4 data-[state=open]:border-blue-400" value="item-1">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Info className="w-4 h-4" />
              Important Notes & Disclaimers
            </div>
          </AccordionTrigger>

          <AccordionContent className="text-sm text-gray-700 space-y-2 pb-4">
            {disclaimer.map((item, i) => (
              <p key={i}>• {item}</p>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Cards (unchanged) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* PRE HARVEST */}
        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-6">
            <h2 className="font-semibold text-lg mb-4">Pre Harvesting</h2>

            {/* Header Row */}
            <div className="grid grid-cols-3 text-sm font-medium text-gray-500 mb-2">
              <span></span>
              <span className="text-right">Short-term</span>
              <span className="text-right">Long-term</span>
            </div>

            {/* Rows */}
            <div className="space-y-2 text-sm">

              <div className="grid grid-cols-3">
                <span>Profits</span>
                <span className="text-right">$1,540</span>
                <span className="text-right">$1,200</span>
              </div>

              <div className="grid grid-cols-3">
                <span>Losses</span>
                <span className="text-right" >-$743</span>
                <span className="text-right">-$650</span>
              </div>

              <div className="grid grid-cols-3 font-medium">
                <span >Net Capital Gains</span>
                <span className="text-right">$787</span>
                <span className="text-right">$550</span>
              </div>

            </div>

            {/* Bottom */}
            <div className="mt-6 flex justify-between items-center">
              <span className="text-base font-medium">
                Realised Capital Gains:
              </span>
              <span className="text-2xl font-bold">$1,337</span>
            </div>
          </CardContent>
        </Card>


        {/* AFTER HARVEST */}
        <Card className="rounded-2xl shadow-sm bg-linear-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <h2 className="font-semibold text-lg mb-4">After Harvesting</h2>

            {/* Header Row */}
            <div className="grid grid-cols-3 text-sm font-medium opacity-80 mb-2">
              <span></span>
              <span className="text-right">Short-term</span>
              <span className="text-right">Long-term</span>
            </div>

            {/* Rows */}
            <div className="space-y-2 text-sm">

              <div className="grid grid-cols-3">
                <span>Profits</span>
                <span className="text-right">$1,540</span>
                <span className="text-right">$1,200</span>
              </div>

              <div className="grid grid-cols-3">
                <span>Losses</span>
                <span className="text-right">-$2,343</span>
                <span className="text-right">-$3,650</span>
              </div>

              <div className="grid grid-cols-3 font-medium">
                <span>Net Capital Gains</span>
                <span className="text-right">-$987</span>
                <span className="text-right">-$2,450</span>
              </div>

            </div>

            {/* Bottom */}
            <div className="mt-6">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Effective Capital Gains:</span>
                <span>- $2,353</span>
              </div>

              <div className="mt-3 text-sm">
                🎉 You are going to save upto <span className="font-semibold">$862</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* TABLE */}
      <Card>
        <CardContent className="p-0">
          <div className="p-6 pb-2">
            <h2 className="font-semibold text-lg">Holdings</h2>
          </div>

          <div className="px-4 pb-4">

            {/* Header */}
            <div className="grid grid-cols-6 bg-gray-100 rounded-lg px-4 py-3 text-sm font-medium">
              <span>Asset</span>
              <span>Holdings</span>
              <span>Total Current Value</span>

              {/* SORT COLUMN */}
              <span
                onClick={handleSort}
                className="cursor-pointer flex items-center gap-1"
              >
                Short-term
                <span className="text-xs">
                  {sortOrder === "asc" ? "↑" : "↓"}
                </span>
              </span>

              <span>Long-term</span>
              <span className="text-right">Amount to Sell</span>
            </div>

            {/* Scrollable */}
            <div className="mt-2 max-h-64 overflow-y-auto space-y-1 pr-1">
              {data.map((coin, i) => {
                const isSelected = selectedRows.includes(i);

                return (
                  <div
                    key={i}
                    onClick={() => toggleRow(i)}
                    className={`grid grid-cols-6 px-4 py-3 rounded-lg cursor-pointer ${isSelected ? "bg-blue-100" : "hover:bg-gray-50"
                      }`}
                  >
                    {/* Asset */}
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleRow(i)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <span>{coin.icon}</span>
                      <div>
                        <p>{coin.name}</p>
                        <p className="text-xs text-gray-500">{coin.symbol}</p>
                      </div>
                    </div>

                    <span>{coin.quantity}</span>

                    {/* VALUE TOOLTIP */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="cursor-pointer font-medium">
                          {coin.value}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent className="bg-white text-black px-3 py-1 rounded shadow">
                        {coin.value}
                      </TooltipContent>
                    </Tooltip>

                    {/* SHORT TOOLTIP */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span
                          className={`cursor-pointer ${coin.shortNum < 0
                            ? "text-red-500"
                            : "text-green-500"
                            }`}
                        >
                          {coin.short}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent className="bg-white text-black px-3 py-1 rounded shadow">
                        {coin.short}
                      </TooltipContent>
                    </Tooltip>

                    {/* LONG TOOLTIP */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span
                          className={`cursor-pointer ${coin.longNum < 0
                            ? "text-red-500"
                            : "text-green-500"
                            }`}
                        >
                          {coin.long}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent className="bg-white text-black px-3 py-1 rounded shadow">
                        {coin.long}
                      </TooltipContent>
                    </Tooltip>

                    <span className="text-right">
                      {isSelected ? coin.quantity : "-"}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-3 text-blue-600 text-sm cursor-pointer hover:underline">
              View all
            </div>

          </div>
        </CardContent>
      </Card>

    </main>
  );
}