import { create } from "zustand";
//import { SKUProducts } from "../data/SKUData";
import { IRow } from "@/shared.types";

type AppStore = {
  products: IRow[];
  addProduct: (product: IRow) => void;
  removeProduct: (ID: string) => void;
  updateProduct: (ID: string, updatedData: Partial<IRow>) => void;
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
}));
