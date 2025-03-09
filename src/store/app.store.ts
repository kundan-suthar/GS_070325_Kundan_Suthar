import { create } from "zustand";
//import { SKUProducts } from "../data/SKUData";
import { IRow } from "@/shared.types";

type AppStore = {
  products: IRow[];
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
  addProduct: (product: IRow) =>
    set((state) => ({
      products: state.products ? [...state.products, product] : [product],
    })),
}));
