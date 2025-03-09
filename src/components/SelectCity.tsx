import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface SelectCityProps {
  onSelect: (value: string) => void;
}
export function SelectCity({ onSelect }: SelectCityProps) {
  const cities = [
    "San Francisco",
    "Phoenix",
    "Dallas",
    "Atlanta",
    "Nashville",
    "New York",
    "Denver",
    "Philadelphia",
    "Boston",
    "Austin",
    "Los Angeles",
    "Houston",
    "Portland",
    "Chicago",
    "Las Vegas",
    "Seattle",
    "Miami",
    "San Diego",
    "Charlotte",
    "Detroit",
  ];

  return (
    <Select onValueChange={onSelect}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Class" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Class</SelectLabel>
          {cities.map((city, index) => (
            <SelectItem key={index} value={city}>
              {city}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
