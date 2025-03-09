import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import { useAppStore } from "@/store/app.store";

import { SelectCity } from "./SelectCity";
import { IRowStore } from "@/shared.types";
import { SelectState } from "./SelectState";

export function AddStore() {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    label: "",
    city: "",
    state: "",
  });
  const { stores, addStore } = useAppStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    if (!formData.label || !formData.state || !formData.city) {
      alert("Please fill all fields");
      return;
    }
    const lastSeqNo = stores.length + 1;
    const newStore: IRowStore = {
      id: `SK${Math.floor(1000 + Math.random() * 90000)}`,
      seqNo: lastSeqNo,
      label: formData.label,
      state: formData.state,
      city: formData.city,
    };
    addStore(newStore);
    setOpen(false);
    console.log("store Added:", newStore);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" onClick={() => setOpen(true)}>
          Add Store
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Store</DialogTitle>
          <DialogDescription>
            Add the details to create new Store.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Label" className="text-right">
              Label
            </Label>
            <Input
              id="label"
              placeholder="Store Name"
              className="col-span-3 w-[180px]"
              onChange={handleChange}
              value={formData.label}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">State</Label>
            <SelectState
              onSelect={(value) => handleSelectChange("state", value)}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">City</Label>
            <SelectCity
              onSelect={(value) => handleSelectChange("city", value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
