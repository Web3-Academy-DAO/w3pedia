import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { FC } from "react";

interface SelectOption {
  value: string;
  name: string;
}

interface SelectOptionProps {
  value?: SelectOption,
  data?: SelectOption[];
  onChange?: (value: SelectOption) => void;
}

const SelectControl: FC<SelectOptionProps> = ({ value = { value: "", name: "" }, data = [], onChange = (e) => { } }: SelectOptionProps) => {
  return (<Listbox value={value} onChange={onChange}>
    <Listbox.Button className="relative w-full cursor-pointer rounded-3xl bg-white text-md text-left py-2 pl-10 pr-4 ring-2 ring-purple-700 shadow-2xl	shadow-purple-700 z-20 md:text-lg">
      <span className="block truncate">{value.name}</span>
      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
        <ChevronDownIcon
          className="h-8 w-8 text-gray-400"
        />
      </span>
    </Listbox.Button>
    <Listbox.Options className="absolute rounded-3xl top-0 pt-12 max-h-100 w-full overflow-auto bg-white text-md text-left z-10 md:text-lg">
      {data.map((item, index) => (
        <Listbox.Option
          key={index}
          value={item}
          className="relative cursor-pointer select-none py-2 pl-10 pr-4 hover:bg-purple-100"
        >
          {value?.value == item.value ? (
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
              <CheckIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          ) : null}
          {item.name}
        </Listbox.Option>
      ))}
    </Listbox.Options>
  </Listbox>)
}

export { SelectControl };
export type { SelectOption };
