import { ScrollArea } from "@/components/ui/scroll-area";
import { VIDEOS } from "@/data/video";
import { ADD_VIDEO, dispatch } from "@designcombo/events";
import { generateId } from "@designcombo/timeline";

export const Videos = () => {
  const handleAddVideo = (src: string) => {
    dispatch(ADD_VIDEO, {
      payload: {
        id: generateId(),
        details: {
          src: src
        },
        metadata: {
          resourceId: src
        }
      },
      options: {
        resourceId: "main"
      }
    });
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="text-sm flex-none text-text-primary font-medium h-12  flex items-center px-4">
        Videos
      </div>
      <ScrollArea>
        <div className="px-4 masonry-sm">
          {VIDEOS.map((image, index) => {
            return (
              <div
                onClick={() => handleAddVideo(image.src)}
                key={index}
                className="flex items-center justify-center w-full  bg-background pb-2 overflow-hidden cursor-pointer"
              >
                <img
                  src={image.preview}
                  className="w-full h-full object-cover rounded-md"
                  alt="image"
                />
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};
