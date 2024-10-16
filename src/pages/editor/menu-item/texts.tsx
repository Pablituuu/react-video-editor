import { Button } from "@/components/ui/button";
import { DEFAULT_FONT } from "@/data/fonts";
import { ADD_TEXT, dispatch } from "@designcombo/events";
import { generateId } from "@designcombo/timeline";

export const Texts = () => {
  const handleAddText = () => {
    dispatch(ADD_TEXT, {
      payload: {
        id: generateId(),
        display: {
          from: 0,
          to: 1000
        },
        details: {
          text: "Heading and some body",
          fontSize: 120,
          width: 600,
          fontUrl: DEFAULT_FONT.url,
          fontFamily: DEFAULT_FONT.postScriptName,
          color: "#ffffff",
          wordWrap: "break-word",
          textAlign: "center",
          borderWidth: 0,
          borderColor: "#000000",
          boxShadow: {
            color: "#ffffff",
            x: 0,
            y: 0,
            blur: 0
          }
        }
      },
      options: {}
    });
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="text-sm flex-none text-text-primary font-medium h-12  flex items-center px-4">
        Text
      </div>
      <div className="px-4 flex flex-col gap-2">
        <Button onClick={handleAddText} variant="secondary" className="w-full">
          Add text
        </Button>
      </div>
    </div>
  );
};
