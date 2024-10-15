import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Slider } from "@/components/ui/slider";
import { useState } from "react";

const Speed = () => {
  const [_, setValue] = useState([10]);

  return (
    <div className="flex flex-col gap-2 py-4">
      <Label className="font-sans text-muted-foreground text-xs font-semibold">
        Speed
      </Label>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 40px",
          gap: "4px"
        }}
      >
        <Slider
          id="opacity"
          max={1}
          step={0.1}
          onValueChange={setValue}
          aria-label="Temperature"
        />
        <Input
          variant="secondary"
          className="w-11 px-2 text-sm text-center"
          defaultValue={1}
        />
      </div>
    </div>
  );
};

export default Speed;
