import { IPlanningMain } from "@/shared.types";
import { useAppStore } from "@/store/app.store";
import { AllCommunityModule, ColDef, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";
import { calendar } from "@/data/Calendar"; // your calendar array

ModuleRegistry.registerModules([AllCommunityModule]);

// Helper to format currency values
const currencyFormatter = (params: any) => {
  if (typeof params.value === "number") {
    return `$${params.value.toFixed(2)}`;
  }
  return params.value;
};

const Planning = () => {
  const { stores, products, planningData } = useAppStore();

  // ───────────────────────────────────────────────
  // 1. Use the calendar array to build a mapping of weeks grouped by MonthLabel.
  // ───────────────────────────────────────────────
  const weeksByMonth = useMemo(() => {
    const groups: Record<string, any[]> = {};
    calendar.forEach((item) => {
      const month = item.MonthLabel; // e.g., "Feb", "Mar"
      if (!groups[month]) {
        groups[month] = [];
      }
      groups[month].push(item);
    });
    // Sort weeks in each month by their SeqNo
    Object.keys(groups).forEach((month) => {
      groups[month].sort((a, b) => a.SeqNo - b.SeqNo);
    });
    return groups;
  }, []);

  // Unique months ordered by the first occurrence in calendar
  const uniqueMonths = useMemo(() => {
    const months = Object.keys(weeksByMonth);
    months.sort((a, b) => {
      const aSeq = weeksByMonth[a][0].SeqNo;
      const bSeq = weeksByMonth[b][0].SeqNo;
      return aSeq - bSeq;
    });
    return months;
  }, [weeksByMonth]);

  // Get unique weeks from calendar, sorted by SeqNo
  const uniqueWeeks = useMemo(() => {
    return Array.from(new Set(calendar.map((item) => item.Week))).sort(
      (a, b) => {
        const aItem = calendar.find((c) => c.Week === a);
        const bItem = calendar.find((c) => c.Week === b);
        return (aItem?.SeqNo || 0) - (bItem?.SeqNo || 0);
      }
    );
  }, []);

  // ───────────────────────────────────────────────
  // 2. Build rowData as a cross join of Stores and Products.
  // Each row includes Price and Cost (for calculations) and a field for each week's Sales Units.
  // ───────────────────────────────────────────────
  const rowData = useMemo(() => {
    const data: any[] = [];
    // Create a row for every combination of store and product.
    stores.forEach((store) => {
      products.forEach((product) => {
        const row: any = {
          StoreLabel: store.label,
          SKUName: product.Label,
          Price: product.Price,
          Cost: product.Cost,
        };
        // Initialize a SalesUnits field for every week from the calendar.
        uniqueWeeks.forEach((week) => {
          row[`SalesUnits_${week}`] = 0;
        });
        data.push(row);
      });
    });
    // Now update rows with actual planningData values.
    planningData.forEach((plan) => {
      const store = stores.find((s) => s.id === plan.Store);
      const product = products.find((p) => p.ID === plan.SKU);
      if (store && product) {
        const row = data.find(
          (r) => r.StoreLabel === store.label && r.SKUName === product.Label
        );
        if (row) {
          // planningData contains the week (e.g., "W01") and SalesUnits.
          row[`SalesUnits_${plan.Week}`] = parseInt(plan.SalesUnits, 10);
        }
      }
    });
    return data;
  }, [stores, products, planningData, uniqueWeeks]);

  // ───────────────────────────────────────────────
  // 3. Build dynamic column definitions.
  // Fixed columns for Store and Product Name, then for each month group,
  // generate week groups with four sub-columns:
  //   a. Sales Units (editable)
  //   b. Sales Dollars: Sales Units * Price (non-editable, currency)
  //   c. GM Dollars: Sales Units * (Price - Cost) (non-editable, currency)
  //   d. GM %: Calculated as GM Dollars / Sales Dollars (non-editable, percentage with conditional formatting)
  // ───────────────────────────────────────────────
  const baseCols: ColDef[] = [
    { headerName: "Store", field: "StoreLabel", pinned: "left", width: 150 },
    {
      headerName: "Product Name",
      field: "SKUName",
      pinned: "left",
      width: 180,
    },
  ];

  const monthCols = uniqueMonths.map((month) => {
    const weeks = weeksByMonth[month] || [];
    return {
      headerName: month,
      children: weeks.map((weekItem) => {
        const week = weekItem.Week; // e.g., "W01"
        return {
          headerName: weekItem.WeekLabel, // e.g., "Week 01"
          children: [
            {
              headerName: "Sales Units",
              field: `SalesUnits_${week}`,
              editable: true,
              cellEditor: "agNumericCellEditor",
              width: 120,
            },
            {
              headerName: "Sales Dollars",
              width: 120,
              // Calculated as Sales Units * Price.
              valueGetter: (params: any) => {
                const units = params.data[`SalesUnits_${week}`] || 0;
                return units * params.data.Price;
              },
              valueFormatter: currencyFormatter,
              cellClass: "non-editable-cell",
            },
            {
              headerName: "GM Dollars",
              width: 120,
              // Calculated as Sales Units * (Price - Cost).
              valueGetter: (params: any) => {
                const units = params.data[`SalesUnits_${week}`] || 0;
                return units * (params.data.Price - params.data.Cost);
              },
              valueFormatter: currencyFormatter,
              cellClass: "non-editable-cell",
            },
            {
              headerName: "GM %",
              width: 100,
              // Calculate GM % as GM Dollars / Sales Dollars.
              valueGetter: (params: any) => {
                const units = params.data[`SalesUnits_${week}`] || 0;
                const salesDollars = units * params.data.Price;
                if (!salesDollars || salesDollars === 0) return "0 %";
                const gmDollars =
                  units * (params.data.Price - params.data.Cost);
                const percent = (gmDollars / salesDollars) * 100;
                return percent.toFixed(2) + " %";
              },
              cellStyle: (params: any) => {
                const units = params.data[`SalesUnits_${week}`] || 0;
                const salesDollars = units * params.data.Price;
                if (!salesDollars || salesDollars === 0)
                  return { backgroundColor: "red", color: "white" };
                const gmDollars =
                  units * (params.data.Price - params.data.Cost);
                const percent = (gmDollars / salesDollars) * 100;
                if (percent >= 40) {
                  return { backgroundColor: "green", color: "white" };
                } else if (percent >= 10 && percent < 40) {
                  return { backgroundColor: "yellow" };
                } else if (percent > 5 && percent < 10) {
                  return { backgroundColor: "orange" };
                } else if (percent <= 5) {
                  return { backgroundColor: "red", color: "white" };
                }
                return {};
              },
              cellClass: "non-editable-cell",
            },
          ],
        };
      }),
    };
  });

  const colDefs: (ColDef | any)[] = [...baseCols, ...monthCols];

  return (
    <div className="ag-theme-alpine" style={{ height: "600px", width: "100%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        onCellValueChanged={(params) => {
          // Refresh all cells, forcing the valueGetter to recalc GM %
          params.api.refreshCells({ force: true });
        }}
      />
    </div>
  );
};

export default Planning;
