import { create } from "zustand";
//import { SKUProducts } from "../data/SKUData";
import { IRow, IRowStore } from "@/shared.types";
const storeData = [
  {
    seqNo: 1,
    id: "ST035",
    label: "San Francisco Bay Trends",
    city: "San Francisco",
    state: "CA",
  },
  {
    seqNo: 2,
    id: "ST046",
    label: "Phoenix Sunwear",
    city: "Phoenix",
    state: "AZ",
  },
  {
    seqNo: 3,
    id: "ST064",
    label: "Dallas Ranch Supply",
    city: "Dallas",
    state: "TX",
  },
  {
    seqNo: 4,
    id: "ST066",
    label: "Atlanta Outfitters",
    city: "Atlanta",
    state: "GA",
  },
  {
    seqNo: 5,
    id: "ST073",
    label: "Nashville Melody Music Store",
    city: "Nashville",
    state: "TN",
  },
  {
    seqNo: 6,
    id: "ST074",
    label: "New York Empire Eats",
    city: "New York",
    state: "NY",
  },
  {
    seqNo: 7,
    id: "ST091",
    label: "Denver Peaks Outdoor",
    city: "Denver",
    state: "CO",
  },
  {
    seqNo: 8,
    id: "ST094",
    label: "Philadelphia Liberty Market",
    city: "Philadelphia",
    state: "PA",
  },
  {
    seqNo: 9,
    id: "ST097",
    label: "Boston Harbor Books",
    city: "Boston",
    state: "MA",
  },
  {
    seqNo: 10,
    id: "ST101",
    label: "Austin Vibe Co.",
    city: "Austin",
    state: "TX",
  },
  {
    seqNo: 11,
    id: "ST131",
    label: "Los Angeles Luxe",
    city: "Los Angeles",
    state: "CA",
  },
  {
    seqNo: 12,
    id: "ST150",
    label: "Houston Harvest Market",
    city: "Houston",
    state: "TX",
  },
  {
    seqNo: 13,
    id: "ST151",
    label: "Portland Evergreen Goods",
    city: "Portland",
    state: "OR",
  },
  {
    seqNo: 14,
    id: "ST156",
    label: "Chicago Charm Boutique",
    city: "Chicago",
    state: "IL",
  },
  {
    seqNo: 15,
    id: "ST163",
    label: "Las Vegas Neon Treasures",
    city: "Las Vegas",
    state: "NV",
  },
  {
    seqNo: 16,
    id: "ST175",
    label: "Seattle Skyline Goods",
    city: "Seattle",
    state: "WA",
  },
  {
    seqNo: 17,
    id: "ST176",
    label: "Miami Breeze Apparel",
    city: "Miami",
    state: "FL",
  },
  {
    seqNo: 18,
    id: "ST177",
    label: "San Diego Wave Surf Shop",
    city: "San Diego",
    state: "CA",
  },
  {
    seqNo: 19,
    id: "ST193",
    label: "Charlotte Queen’s Closet",
    city: "Charlotte",
    state: "NC",
  },
  {
    seqNo: 20,
    id: "ST208",
    label: "Detroit Motor Gear",
    city: "Detroit",
    state: "MI",
  },
];
type AppStore = {
  products: IRow[];
  addProduct: (product: IRow) => void;
  removeProduct: (ID: string) => void;
  updateProduct: (ID: string, updatedData: Partial<IRow>) => void;
  stores: IRowStore[];
  addStore: (store: IRowStore) => void;
  removeStore: (id: string) => void;
};
export const useAppStore = create<AppStore>((set) => ({
  products: [
    {
      ID: "SK00158",
      Label: "Crew Neck Merino Wool Sweater",
      Class: "Tops",
      Department: "Men's Apparel",
      Price: 114.99,
      Cost: 18.28,
    },
    // Add other products here...
  ],
  stores: storeData,
  addProduct: (product: IRow) =>
    set((state) => ({
      products: state.products ? [...state.products, product] : [product],
    })),
  removeProduct: (ID: string) =>
    set((state) => ({
      products: state.products.filter((product) => product.ID !== ID),
    })),
  updateProduct: (ID, updatedData) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.ID === ID ? { ...product, ...updatedData } : product
      ),
    })),
  addStore: (store: IRowStore) =>
    set((state) => ({
      stores: state.stores ? [...state.stores, store] : [store],
    })),
  removeStore: (id: string) =>
    set((state) => {
      // Filter out the item
      const updatedData = state.stores.filter((item) => item.id !== id);

      // Reassign seqNo starting from 1
      const reorderedData = updatedData.map((item, index) => ({
        ...item,
        seqNo: index + 1,
      }));

      return { stores: reorderedData };
    }),
}));
