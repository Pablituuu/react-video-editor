import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";

export const Texts = () => {
  return (
    <div className="flex flex-col h-full">
      <ScrollArea>
        <div className="text-md text-[#e4e4e7] font-medium h-11 border-b border-border flex items-center px-4 text-muted-foreground">
          Text
        </div>
        <div className="flex w-full items-center justify-center">
          <Label className="border-4 cursor-pointer rounded-xl p-3 m-3 font-bold text-[28px]">
            Add title
          </Label>
        </div>
        <div className="flex w-full items-center justify-center">
          <Label className="border-4 cursor-pointer rounded-xl p-3 m-3 text-[14px]">
            Add Paragraph
          </Label>
        </div>
        <div className="text-md mb-3 text-[#e4e4e7] px-4 font-medium flex items-center text-muted-foreground">
          Font Styles
        </div>
        <div className="grid grid-cols-2 gap-3 px-3 items-center justify-center">
          <Label
            className="border-4 cursor-pointer rounded-xl text-[15px] text-[#e4e4e7] flex font-medium items-center justify-center "
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            Roboto
          </Label>
          <Label
            className="border-4 cursor-pointer rounded-xl text-[15px] text-[#e4e4e7] flex font-medium items-center justify-center "
            style={{ fontFamily: "Open Sans, sans-serif" }}
          >
            Open Sans
          </Label>
          <Label
            className="border-4 cursor-pointer rounded-xl text-[15px] text-[#e4e4e7] flex font-medium items-center justify-center "
            style={{ fontFamily: "Lora, serif" }}
          >
            Lora
          </Label>
          <Label
            className="border-4 cursor-pointer rounded-xl text-[15px] text-[#e4e4e7] flex font-medium items-center justify-center "
            style={{ fontFamily: "Merriweather, serif" }}
          >
            Merriweather
          </Label>
          <Label
            className="border-4 cursor-pointer rounded-xl text-[15px] text-[#e4e4e7] flex font-medium items-center justify-center "
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Montserrat
          </Label>
          <Label
            className="border-4 cursor-pointer rounded-xl text-[15px] text-[#e4e4e7] flex font-medium items-center justify-center "
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Playfair
          </Label>
        </div>
      </ScrollArea>
    </div>
  );
};
