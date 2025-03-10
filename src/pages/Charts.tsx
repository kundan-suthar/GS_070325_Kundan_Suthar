import React, { useMemo } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
//import { planningData, products } from "@/data";
import { useAppStore } from "@/store/app.store";

const selectedStore = "ST035"; // Fixed store selection

const SalesChart = () => {
  const { products, planningData, stores } = useAppStore();
  // Find the store name
  const store = stores.find((s) => s.id === selectedStore);
  const storeName = store ? store.label : "Unknown Store";

  // Function to get 52 weeks of data for the selected store
  const weeklyData = useMemo(() => {
    return Array.from({ length: 52 }, (_, index) => {
      const week = `W${String(index + 1).padStart(2, "0")}`;
      const sales = planningData.filter(
        (p) => p.Store === selectedStore && p.Week === week
      );

      let totalGM = 0;
      let totalSalesDollars = 0;

      sales.forEach(({ SKU, SalesUnits }) => {
        const product = products.find((p) => p.ID === SKU);
        if (product) {
          const salesDollars = SalesUnits * product.Price;
          const gmDollars = salesDollars - SalesUnits * product.Cost;
          totalGM += gmDollars;
          totalSalesDollars += salesDollars;
        }
      });

      return {
        week,
        grossMargin: totalGM,
        gmPercentage:
          totalSalesDollars > 0 ? (totalGM / totalSalesDollars) * 100 : 0,
      };
    });
  }, []);

  return (
    <Card className="p-4">
      <CardHeader>
        <h2 className="text-xl font-bold">
          Gross Margin & GM% Trend (52 Weeks)
        </h2>
        <p className="text-sm text-gray-500">
          Store: {storeName} ({selectedStore})
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={500}>
          <ComposedChart data={weeklyData}>
            <XAxis dataKey="week" />
            <YAxis
              yAxisId="left"
              label={{
                value: "Gross Margin ($)",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              label={{ value: "GM %", angle: -90, position: "insideRight" }}
            />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar
              yAxisId="left"
              dataKey="grossMargin"
              fill="#82ca9d"
              name="Gross Margin"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="gmPercentage"
              stroke="#8884d8"
              name="GM %"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SalesChart;
