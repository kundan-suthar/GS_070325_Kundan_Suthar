import { AddStore } from "@/components/AddStore";
import { IRowStore } from "@/shared.types";
import { useAppStore } from "@/store/app.store";
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact, CustomCellRendererProps } from "ag-grid-react";
import { Grip, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

ModuleRegistry.registerModules([AllCommunityModule]);

const DeleteButtonComponent = ({ id }: { id: string }) => {
  const removeStore = useAppStore((state) => state.removeStore);

  return (
    <button
      className="hover:cursor-pointer pt-2"
      onClick={() => removeStore(id)}
    >
      <Trash2 size={16} />
    </button>
  );
};
// Custom Cell Renderer (Display logos based on cell value)
const SrNoRenderer = (params: CustomCellRendererProps) => (
  <span
    style={{
      display: "flex",
      height: "100%",
      width: "100%",
      alignItems: "center",
    }}
  >
    {params.value && <Grip size={16} />}
    <p
      className="pl-2"
      style={{
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      {params.value}
    </p>
  </span>
);

const Store = () => {
  const stores = useAppStore((state) => state.stores);
  const [storeData, setStoreData] = useState(stores);
  const updateStore = useAppStore((state) => state.updateStore);
  //Row Data: data to be displayed
  //const [rowData] = useState<IRow[]>(storeData);
  //Colunm defination : defines and controls grid colunm
  const [colDefs] = useState<ColDef<IRowStore>[]>([
    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cellRenderer: (params: any) => (
        <DeleteButtonComponent id={params.data.id} />
      ),
      width: 50,
    },
    {
      field: "seqNo",
      headerName: "S.No.",
      cellRenderer: SrNoRenderer,
      width: 100,
    },
    {
      field: "label",
      headerName: "Store",
      headerStyle: {
        borderRight: "1px solid #ccc",
      },
      cellStyle: { borderRight: "1px solid #ccc" },
      headerClass: "no-resize-header", // Add a custom class
      editable: true,
      onCellValueChanged: (params) => {
        updateStore(params.data.id, { label: params.newValue });
      },
    },
    { field: "city" },
    { field: "state" },
  ]);
  // const defaultColDef: ColDef = {
  //   flex: 1,
  // };
  useEffect(() => {
    setStoreData(stores);
  }, [stores]);

  return (
    <div style={{ width: "100%", height: "90%" }}>
      <AgGridReact
        rowData={storeData}
        columnDefs={colDefs}
        // defaultColDef={defaultColDef}
      />
      <div className="mt-2">
        <AddStore />
      </div>
    </div>
  );
};

export default Store;
