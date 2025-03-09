import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectDepartmentProps {
  onSelect: (value: string) => void;
}
export function SelectDepartment({ onSelect }: SelectDepartmentProps) {
  const departments = [
    "Men's Apparel",
    "Footwear",
    "Unisex Accessories",
    "Women's Apparel",
    "Sportswear",
  ];

  // console.log(selected);
  return (
    <Select onValueChange={onSelect}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Department" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Department</SelectLabel>
          {departments.map((dept, index) => (
            <SelectItem key={index} value={dept}>
              {dept}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
