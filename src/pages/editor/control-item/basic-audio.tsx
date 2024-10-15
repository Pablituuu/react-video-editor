import { ScrollArea } from "@/components/ui/scroll-area";
import { ITrackItem } from "@designcombo/types";
import Volume from "./common/volume";
import Speed from "./common/speed";
import { useState } from "react";
import { EDIT_OBJECT, dispatch } from "@designcombo/events";

const BasicAudio = ({ trackItem }: { trackItem: ITrackItem }) => {
  const [properties, setProperties] = useState(trackItem);

  const handleChangeVolume = (v: number) => {
    dispatch(EDIT_OBJECT, {
      payload: {
        [trackItem.id]: {
          details: {
            volume: v
          }
        }
      }
    });

    setProperties((prev) => {
      return {
        ...prev,
        details: {
          ...prev.details,
          volume: v
        }
      } as ITrackItem;
    });
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="text-sm text-text-primary font-medium h-12  flex items-center px-4 flex-none">
        Audio
      </div>
      <ScrollArea className="h-full">
        <div className="px-4 flex flex-col gap-2">
          <Volume
            onChange={(v: number) => handleChangeVolume(v)}
            value={properties.details.volume}
          />
          <Speed />
        </div>
      </ScrollArea>
    </div>
  );
};

export default BasicAudio;
