import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";

export default function VideoProps() {
  return (
    <div className="flex flex-col overflor-auto">
      <div className="text-md text-[#e4e4e7] font-medium h-11 border-b  border-border flex items-center px-4 text-muted-foreground">
        Properties
      </div>
      <div className="text-md text-[#e4e4e7] font-medium h-11 flex items-center px-4 text-muted-foreground">
        Saturation
      </div>
      <div className="grid grid-cols-4 items-center mx-4">
        <div className="flex">
          <Input size="sm" />
        </div>
        <div className="flex justify-center col-span-3">
          <Slider
            defaultValue={[50]}
            max={100}
            step={1}
            className={cn("w-[60%]")}
          />
        </div>
      </div>

      <div className="text-md text-[#e4e4e7] font-medium h-11 flex items-center px-4 text-muted-foreground">
        Temperature
      </div>
      <div className="grid grid-cols-4 items-center mx-4">
        <div className="flex">
          <Input size="sm" />
        </div>
        <div className="flex justify-center col-span-3">
          <Slider
            defaultValue={[50]}
            max={100}
            step={1}
            className={cn("w-[60%]")}
          />
        </div>
      </div>

      <div className="text-md text-[#e4e4e7] font-medium h-11 flex items-center px-4 text-muted-foreground">
        Brillights
      </div>
      <div className="grid grid-cols-4 items-center mx-4">
        <div className="flex">
          <Input size="sm" />
        </div>
        <div className="flex justify-center col-span-3">
          <Slider
            defaultValue={[50]}
            max={100}
            step={1}
            className={cn("w-[60%]")}
          />
        </div>
      </div>

      <div className="text-md text-[#e4e4e7] font-medium h-11 flex items-center px-4 text-muted-foreground">
        Contrast
      </div>
      <div className="grid grid-cols-4 items-center mx-4">
        <div className="flex">
          <Input size="sm" />
        </div>
        <div className="flex justify-center col-span-3">
          <Slider
            defaultValue={[50]}
            max={100}
            step={1}
            className={cn("w-[60%]")}
          />
        </div>
      </div>

      <div className="text-md text-[#e4e4e7] font-medium h-11 flex items-center px-4 text-muted-foreground">
        Opacity
      </div>
      <div className="grid grid-cols-4 items-center mx-4">
        <div className="flex">
          <Input size="sm" />
        </div>
        <div className="flex justify-center col-span-3">
          <Slider
            defaultValue={[50]}
            max={100}
            step={1}
            className={cn("w-[60%]")}
          />
        </div>
      </div>
    </div>
  );
}
