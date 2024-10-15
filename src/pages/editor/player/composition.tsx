import useStore from "@/store/store";
import { SequenceItem } from "./sequence-item";
import { IItem, ITrackItem } from "@designcombo/types";

const Composition = () => {
  const { trackItemIds, trackItemsMap, fps, trackItemDetailsMap } = useStore();
  return (
    <>
      {trackItemIds.map((id) => {
        const item = trackItemsMap[id];
        const itemDetails = trackItemDetailsMap[id];
        if (!item || !itemDetails) return;
        const trackItem = {
          ...item,
          details: itemDetails.details
        } as ITrackItem & IItem;
        return SequenceItem[trackItem.type](trackItem, {
          fps
        });
      })}
    </>
  );
};

export default Composition;
