import { Button } from "@/components/ui/button";
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Trash2 } from "lucide-react";
import { useState } from "react";

ModuleRegistry.registerModules([AllCommunityModule]);

const products = [
  {
    ID: "SK00158",
    Label: "Crew Neck Merino Wool Sweater",
    Class: "Tops",
    Department: "Men's Apparel",
    Price: 114.99,
    Cost: 18.28,
  },
  {
    ID: "SK00269",
    Label: "Faux Leather Leggings",
    Class: "Jewelry",
    Department: "Footwear",
    Price: 9.99,
    Cost: 8.45,
  },
  {
    ID: "SK00300",
    Label: "Fleece-Lined Parka",
    Class: "Jewelry",
    Department: "Unisex Accessories",
    Price: 199.99,
    Cost: 17.8,
  },
  {
    ID: "SK00304",
    Label: "Cotton Polo Shirt",
    Class: "Tops",
    Department: "Women's Apparel",
    Price: 139.99,
    Cost: 10.78,
  },
  {
    ID: "SK00766",
    Label: "Foldable Travel Hat",
    Class: "Tops",
    Department: "Footwear",
    Price: 44.99,
    Cost: 27.08,
  },
  {
    ID: "SK00786",
    Label: "Chic Quilted Wallet",
    Class: "Bottoms",
    Department: "Footwear",
    Price: 14.99,
    Cost: 4.02,
  },
  {
    ID: "SK00960",
    Label: "High-Slit Maxi Dress",
    Class: "Outerwear",
    Department: "Sportswear",
    Price: 74.99,
    Cost: 47.47,
  },
  {
    ID: "SK01183",
    Label: "Turtleneck Cable Knit Sweater",
    Class: "Footwear",
    Department: "Footwear",
    Price: 49.99,
    Cost: 22.6,
  },
  {
    ID: "SK01189",
    Label: "Retro-Inspired Sunglasses",
    Class: "Bottoms",
    Department: "Women's Apparel",
    Price: 194.99,
    Cost: 115.63,
  },
  {
    ID: "SK01193",
    Label: "Stretch Denim Overalls",
    Class: "Bottoms",
    Department: "Unisex Accessories",
    Price: 129.99,
    Cost: 47.06,
  },
  {
    ID: "SK01249",
    Label: "Adjustable Elastic Headband",
    Class: "Footwear",
    Department: "Women's Apparel",
    Price: 19.99,
    Cost: 1.34,
  },
  {
    ID: "SK01319",
    Label: "Adjustable Baseball Cap",
    Class: "Jewelry",
    Department: "Men's Apparel",
    Price: 4.99,
    Cost: 2.29,
  },
  {
    ID: "SK01349",
    Label: "Cotton Polo Shirt",
    Class: "Bottoms",
    Department: "Unisex Accessories",
    Price: 114.99,
    Cost: 60.94,
  },
  {
    ID: "SK01549",
    Label: "Faux Suede Ankle Boots",
    Class: "Tops",
    Department: "Sportswear",
    Price: 94.99,
    Cost: 71.53,
  },
  {
    ID: "SK01566",
    Label: "Striped Cotton Socks",
    Class: "Accessories",
    Department: "Sportswear",
    Price: 9.99,
    Cost: 6.91,
  },
  {
    ID: "SK01642",
    Label: "Performance Compression Tights",
    Class: "Outerwear",
    Department: "Sportswear",
    Price: 54.99,
    Cost: 59.61,
  },
  {
    ID: "SK01733",
    Label: "Vintage Logo Hoodie",
    Class: "Accessories",
    Department: "Men's Apparel",
    Price: 94.99,
    Cost: 84.45,
  },
  {
    ID: "SK01896",
    Label: "Floral Chiffon Wrap Dress",
    Class: "Accessories",
    Department: "Unisex Accessories",
    Price: 149.99,
    Cost: 68.55,
  },
  {
    ID: "SK01927",
    Label: "Asymmetrical Hem Skirt",
    Class: "Jewelry",
    Department: "Sportswear",
    Price: 99.99,
    Cost: 66.89,
  },
  {
    ID: "SK01950",
    Label: "Slim Fit Pinstripe Suit",
    Class: "Bottoms",
    Department: "Women's Apparel",
    Price: 99.99,
    Cost: 13.3,
  },
  {
    ID: "SK02029",
    Label: "Chunky Heel Sandals",
    Class: "Jewelry",
    Department: "Unisex Accessories",
    Price: 89.99,
    Cost: 46.7,
  },
  {
    ID: "SK02429",
    Label: "Suede Fringe Vest",
    Class: "Bottoms",
    Department: "Footwear",
    Price: 184.99,
    Cost: 159.65,
  },
  {
    ID: "SK02448",
    Label: "Relaxed Fit Cargo Pants",
    Class: "Bottoms",
    Department: "Sportswear",
    Price: 149.99,
    Cost: 7.2,
  },
  {
    ID: "SK02562",
    Label: "Corduroy A-Line Skirt",
    Class: "Jewelry",
    Department: "Footwear",
    Price: 129.99,
    Cost: 48.62,
  },
  {
    ID: "SK02642",
    Label: "Formal Dress Shoes",
    Class: "Bottoms",
    Department: "Women's Apparel",
    Price: 164.99,
    Cost: 161.69,
  },
  {
    ID: "SK02768",
    Label: "Tailored Corduroy Blazer",
    Class: "Accessories",
    Department: "Sportswear",
    Price: 89.99,
    Cost: 62.99,
  },
  {
    ID: "SK02805",
    Label: "Foldable Travel Hat",
    Class: "Outerwear",
    Department: "Women's Apparel",
    Price: 194.99,
    Cost: 56.16,
  },
  {
    ID: "SK02904",
    Label: "Asymmetrical Hem Skirt",
    Class: "Tops",
    Department: "Unisex Accessories",
    Price: 89.99,
    Cost: 67.94,
  },
  {
    ID: "SK03182",
    Label: "Plaid Flannel Shirt",
    Class: "Tops",
    Department: "Unisex Accessories",
    Price: 124.99,
    Cost: 17.5,
  },
  {
    ID: "SK03289",
    Label: "Oversized Hoodie",
    Class: "Tops",
    Department: "Women's Apparel",
    Price: 159.99,
    Cost: 122.23,
  },
  {
    ID: "SK03348",
    Label: "Woven Straw Sun Hat",
    Class: "Jewelry",
    Department: "Footwear",
    Price: 164.99,
    Cost: 8.91,
  },
  {
    ID: "SK03569",
    Label: "Faux Fur Winter Coat",
    Class: "Tops",
    Department: "Men's Apparel",
    Price: 9.99,
    Cost: 7.37,
  },
  {
    ID: "SK03572",
    Label: "Casual Cotton Romper",
    Class: "Tops",
    Department: "Footwear",
    Price: 119.99,
    Cost: 52.32,
  },
  {
    ID: "SK03636",
    Label: "Racerback Sports Bra",
    Class: "Footwear",
    Department: "Unisex Accessories",
    Price: 14.99,
    Cost: 8.72,
  },
];
//Row Data InterFace
interface IRow {
  ID: string;
  Label: string;
  Class: string;
  Department: string;
  Price: number;
  Cost: number;
}
const DeleteButtonComponent = () => {
  return (
    <button
      className="hover:cursor-pointer pt-2"
      onClick={() => window.alert("clicked")}
    >
      <Trash2 size={16} />
    </button>
  );
};

const SKU = () => {
  //Row Data: data to be displayed
  const [rowData] = useState<IRow[]>(products);
  //Colunm defination : defines and controls grid colunm
  const [colDefs] = useState<ColDef<IRow>[]>([
    {
      cellRenderer: DeleteButtonComponent,
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
    },
    { field: "Price" },
    { field: "Cost" },
  ]);
  return (
    <div style={{ width: "100%", height: "90%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        // defaultColDef={defaultColDef}
      />
      <div className="mt-2">
        <Button>Add SKU</Button>
      </div>
    </div>
  );
};

export default SKU;
