import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface SelectClassProps {
  onSelect: (value: string) => void;
}
export function SelectClass({ onSelect }: SelectClassProps) {
  const categories = [
    "Tops",
    "Jewelry",
    "Bottoms",
    "Outerwear",
    "Footwear",
    "Accessories",
  ];
  return (
    <Select onValueChange={onSelect}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Class" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Class</SelectLabel>
          {categories.map((category, index) => (
            <SelectItem key={index} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
