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
import { SelectClass } from "./SelectClass";
import { SelectDepartment } from "./SelectDepartment";
import { useState } from "react";
import { useAppStore } from "@/store/app.store";
import { IRow } from "@/shared.types";

export function AddSKU() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    label: "",
    class: "",
    department: "",
    price: "",
    cost: "",
  });
  const { addProduct } = useAppStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    if (
      !formData.label ||
      !formData.class ||
      !formData.department ||
      !formData.price ||
      !formData.cost
    ) {
      alert("Please fill all fields");
      return;
    }
    const newProduct: IRow = {
      ID: `SK${Math.floor(1000 + Math.random() * 90000)}`,
      Label: formData.label,
      Class: formData.class,
      Department: formData.department,
      Price: parseFloat(formData.price),
      Cost: parseFloat(formData.cost),
    };
    addProduct(newProduct);
    setOpen(false);
    console.log("Product Added:", newProduct);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" onClick={() => setOpen(true)}>
          Add SKU
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add SKU</DialogTitle>
          <DialogDescription>
            Add the details to create new SKU.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Label" className="text-right">
              Label
            </Label>
            <Input
              id="label"
              placeholder="Product Name"
              className="col-span-3 w-[180px]"
              onChange={handleChange}
              value={formData.label}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Class
            </Label>
            <SelectClass
              onSelect={(value) => handleSelectChange("class", value)}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Department
            </Label>
            <SelectDepartment
              onSelect={(value) => handleSelectChange("department", value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              id="price"
              placeholder="Price"
              className="col-span-3 w-[180px]"
              type="number"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cost" className="text-right">
              Cost
            </Label>
            <Input
              id="cost"
              placeholder="Cost"
              className="col-span-3 w-[180px]"
              type="number"
              value={formData.cost}
              onChange={handleChange}
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
