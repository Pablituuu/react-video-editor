import { ScrollArea } from "@/components/ui/scroll-area";
import { IBoxShadow, ITrackItem } from "@designcombo/types";
import Outline from "./common/outline";
import Shadow from "./common/shadow";
import Opacity from "./common/opacity";
import Rounded from "./common/radius";
import AspectRatio from "./common/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Crop } from "lucide-react";
import { useEffect, useState } from "react";
import { EDIT_OBJECT, dispatch } from "@designcombo/events";
import Blur from "./common/blur";
import Brightness from "./common/brightness";
import Flip from "./common/flip";

const BasicImage = ({ trackItem }: { trackItem: ITrackItem }) => {
  const [properties, setProperties] = useState(trackItem);
  useEffect(() => {
    setProperties(trackItem);
  }, [trackItem]);

  const onChangeBorderWidth = (v: number) => {
    dispatch(EDIT_OBJECT, {
      payload: {
        [trackItem.id]: {
          details: {
            borderWidth: v
          }
        }
      }
    });
    setProperties((prev) => {
      return {
        ...prev,
        details: {
          ...prev.details,
          borderWidth: v
        }
      } as ITrackItem;
    });
  };

  const onChangeBorderColor = (v: string) => {
    dispatch(EDIT_OBJECT, {
      payload: {
        [trackItem.id]: {
          details: {
            borderColor: v
          }
        }
      }
    });
    setProperties((prev) => {
      return {
        ...prev,
        details: {
          ...prev.details,
          borderColor: v
        }
      } as ITrackItem;
    });
  };

  const handleChangeOpacity = (v: number) => {
    dispatch(EDIT_OBJECT, {
      payload: {
        [trackItem.id]: {
          details: {
            opacity: v
          }
        }
      }
    });
    setProperties((prev) => {
      return {
        ...prev,
        details: {
          ...prev.details,
          opacity: v
        }
      } as ITrackItem;
    });
  };

  const onChangeBlur = (v: number) => {
    dispatch(EDIT_OBJECT, {
      payload: {
        [trackItem.id]: {
          details: {
            blur: v
          }
        }
      }
    });
    setProperties((prev) => {
      return {
        ...prev,
        details: {
          ...prev.details,
          blur: v
        }
      } as ITrackItem;
    });
  };
  const onChangeBrightness = (v: number) => {
    dispatch(EDIT_OBJECT, {
      payload: {
        [trackItem.id]: {
          details: {
            brightness: v
          }
        }
      }
    });
    setProperties((prev) => {
      return {
        ...prev,
        details: {
          ...prev.details,
          brightness: v
        }
      } as ITrackItem;
    });
  };

  const onChangeBorderRadius = (v: number) => {
    dispatch(EDIT_OBJECT, {
      payload: {
        [trackItem.id]: {
          details: {
            borderRadius: v
          }
        }
      }
    });
    setProperties((prev) => {
      return {
        ...prev,
        details: {
          ...prev.details,
          borderRadius: v
        }
      } as ITrackItem;
    });
  };

  const onChangeBoxShadow = (boxShadow: IBoxShadow) => {
    dispatch(EDIT_OBJECT, {
      payload: {
        [trackItem.id]: {
          details: {
            boxShadow: boxShadow
          }
        }
      }
    });

    setProperties((prev) => {
      return {
        ...prev,
        details: {
          ...prev.details,
          boxShadow
        }
      } as ITrackItem;
    });
  };
  return (
    <div className="flex-1 flex flex-col">
      <div className="text-sm text-text-primary font-medium h-12  flex items-center px-4 flex-none">
        Image
      </div>
      <ScrollArea className="h-full">
        <div className="px-4 flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <Button variant={"secondary"} size={"icon"}>
              <Crop size={18} />
            </Button>
          </div>
          <AspectRatio />
          <Flip trackItem={trackItem} />
          <Rounded
            onChange={(v: number) => onChangeBorderRadius(v)}
            value={properties.details.borderRadius as number}
          />
          <Outline
            label="Outline"
            onChageBorderWidth={(v: number) => onChangeBorderWidth(v)}
            onChangeBorderColor={(v: string) => onChangeBorderColor(v)}
            valueBorderWidth={properties.details.borderWidth as number}
            valueBorderColor={properties.details.borderColor as string}
          />
          <Shadow
            label="Shadow"
            onChange={(v: IBoxShadow) => onChangeBoxShadow(v)}
            value={properties.details.boxShadow!}
          />
          <Opacity
            onChange={(v: number) => handleChangeOpacity(v)}
            value={properties.details.opacity!}
          />
          <Blur
            onChange={(v: number) => onChangeBlur(v)}
            value={properties.details.blur!}
          />
          <Brightness
            onChange={(v: number) => onChangeBrightness(v)}
            value={properties.details.brightness!}
          />
        </div>
      </ScrollArea>
    </div>
  );
};

export default BasicImage;
