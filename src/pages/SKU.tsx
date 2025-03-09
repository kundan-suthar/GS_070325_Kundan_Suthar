import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppStore } from "../store/app.store";
import { AddSKU } from "@/components/AddSKU";
import { IRow } from "@/shared.types";

ModuleRegistry.registerModules([AllCommunityModule]);

const DeleteButtonComponent = ({ ID }: { ID: string }) => {
  const removeProduct = useAppStore((state) => state.removeProduct);

  return (
    <button
      className="hover:cursor-pointer pt-2"
      onClick={() => removeProduct(ID)}
    >
      <Trash2 size={16} />
    </button>
  );
};

const SKU = () => {
  const products = useAppStore((state) => state.products);
  const updateProduct = useAppStore((state) => state.updateProduct);
  const [productList, setProductList] = useState(products);

  //Row Data: data to be displayed
  // const [rowData] = useState<IRow[]>(productList);
  //Colunm defination : defines and controls grid colunm
  const [colDefs] = useState<ColDef<IRow>[]>([
    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cellRenderer: (params: any) => (
        <DeleteButtonComponent ID={params.data.ID} />
      ),
      width: 50,
    },
    {
      field: "Label",
      headerName: "SKU",
      cellStyle: { borderRight: "1px solid #ccc" },
      headerStyle: {
        borderRight: "1px solid #ccc",
      },
      headerClass: "no-resize-header", // Add a custom class
      width: 300,
      editable: true,
      onCellValueChanged: (params) => {
        updateProduct(params.data.ID, { Label: params.newValue });
      },
    },
    {
      field: "Price",
      editable: true,
      onCellValueChanged: (params) => {
        updateProduct(params.data.ID, { Price: params.newValue });
      },
    },
    {
      field: "Cost",
      editable: true,
      onCellValueChanged: (params) => {
        updateProduct(params.data.ID, { Cost: params.newValue });
      },
    },
  ]);
  useEffect(() => {
    setProductList(products);
    console.log(products);
  }, [products]);
  return (
    <div style={{ width: "100%", height: "90%" }}>
      <AgGridReact
        rowData={productList}
        columnDefs={colDefs}
        // defaultColDef={defaultColDef}
      />
      <div className="mt-2">
        <AddSKU />
      </div>
    </div>
  );
};

export default SKU;
