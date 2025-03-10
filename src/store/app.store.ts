import { create } from "zustand";
//import { SKUProducts } from "../data/SKUData";
import { IRow, IRowStore, IPlanning } from "@/shared.types";
import { SKUProducts } from "@/data/SKUData";
import { storeData } from "@/data/StoresData";
import { planning } from "@/data/planning";

type AppStore = {
  products: IRow[];
  addProduct: (product: IRow) => void;
  removeProduct: (ID: string) => void;
  updateProduct: (ID: string, updatedData: Partial<IRow>) => void;
  stores: IRowStore[];
  addStore: (store: IRowStore) => void;
  removeStore: (id: string) => void;
  updateStore: (id: string, updatedData: Partial<IRowStore>) => void;
  planningData: IPlanning[];
};
export const useAppStore = create<AppStore>((set) => ({
  products: SKUProducts,
  stores: storeData,
  planningData: planning,
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
  updateStore: (id, updatedData) =>
    set((state) => ({
      stores: state.stores.map((store) =>
        store.id === id ? { ...store, ...updatedData } : store
      ),
    })),
}));
