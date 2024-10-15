import { Button } from "@/components/button";
import { Label } from "@/components/ui/label";
import { EDIT_OBJECT, dispatch } from "@designcombo/events";
import { ITrackItem } from "@designcombo/types";
import { useEffect, useState } from "react";

export default function Flip({ trackItem }: { trackItem: ITrackItem }) {
  const [flip, setFlip] = useState({
    flipX: trackItem.details.flipX,
    flipY: trackItem.details.flipY
  });

  const handleFlip = (value: string) => {
    if (value === "x") {
      dispatch(EDIT_OBJECT, {
        payload: {
          [trackItem.id]: {
            details: {
              flipX: !flip.flipX
            }
          }
        }
      });
      setFlip({ ...flip, flipX: !flip.flipX });
    } else if (value === "y") {
      dispatch(EDIT_OBJECT, {
        payload: {
          [trackItem.id]: {
            details: {
              flipY: !flip.flipY
            }
          }
        }
      });
      setFlip({ ...flip, flipY: !flip.flipY });
    }
  };
  return (
    <div className="flex flex-col gap-2 py-4">
      <Label className="font-sans text-muted-foreground text-xs font-semibold">
        Flip
      </Label>
      <div className="flex">
        <Button variant="outline" onClick={() => handleFlip("x")}>
          Flip X
        </Button>
        <Button variant="outline" onClick={() => handleFlip("y")}>
          Flip Y
        </Button>
      </div>
    </div>
  );
}