import { ScrollArea } from "@/components/ui/scroll-area";
import { IMAGES } from "@/data/images";
import { ADD_IMAGE, dispatch } from "@designcombo/events";
import { generateId } from "@designcombo/timeline";

export const Images = () => {
  const handleAddImage = (src: string) => {
    dispatch(ADD_IMAGE, {
      payload: {
        id: generateId(),
        details: {
          src: src
        }
      },
      options: {
        trackId: "main"
      }
    });
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="text-sm flex-none text-text-primary font-medium h-12  flex items-center px-4">
        Photos
      </div>
      <ScrollArea>
        <div className="px-4 masonry-sm">
          {IMAGES.map((image, index) => {
            return (
              <div
                onClick={() => handleAddImage(image.src)}
                key={index}
                className="flex items-center justify-center w-full  bg-background pb-2 overflow-hidden cursor-pointer"
              >
                <img
                  src={image.src}
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
