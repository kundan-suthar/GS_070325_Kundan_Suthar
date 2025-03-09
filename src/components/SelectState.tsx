import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface SelectStateProps {
  onSelect: (value: string) => void;
}
export function SelectState({ onSelect }: SelectStateProps) {
  const states = [
    "CA", // California
    "AZ", // Arizona
    "TX", // Texas
    "GA", // Georgia
    "TN", // Tennessee
    "NY", // New York
    "CO", // Colorado
    "PA", // Pennsylvania
    "MA", // Massachusetts
    "TX", // Texas (duplicate)
    "CA", // California (duplicate)
    "TX", // Texas (duplicate)
    "OR", // Oregon
    "IL", // Illinois
    "NV", // Nevada
    "WA", // Washington
    "FL", // Florida
    "CA", // California (duplicate)
    "NC", // North Carolina
    "MI", // Michigan
  ];

  return (
    <Select onValueChange={onSelect}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a state" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>State</SelectLabel>
          {states.map((state, index) => (
            <SelectItem key={index} value={state}>
              {state}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
