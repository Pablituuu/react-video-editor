import { X } from 'lucide-react';
import { Draggable } from './shared/draggable';
import { Input } from './ui/input';
import useDataState from '@/store/use-data-state';
import { loadFonts } from '@designcombo/core';
import { ICompactFont } from '@/interfaces/editor';

export default function FontSelector() {
  const { compactFonts } = useDataState();

  const handleSelectFont = async (font: ICompactFont) => {
    // const fontName = font.default.postScriptName;
    // const fontUrl = font.default.url;
    // await loadFonts([
    //   {
    //     fontFamily: fontName,
    //     url: fontUrl,
    //   },
    // ]);
    // dispatcher.dispatch(EDIT_OBJECT, {
    //   payload: {
    //     details: {
    //       fontFamily: fontName,
    //       fontUrl: fontUrl,
    //     },
    //   },
    // });
  };
  return (
    <Draggable
      id="fontSelector"
      data={{
        type: 'property',
      }}
      style={{
        position: 'absolute',
        top: 24,
        right: 320,
        zIndex: 100,
        width: 240,
      }}
      className="bg-background-2 p-4 rounded-xl max-h-96 flex flex-col"
    >
      <div className="h-10 flex items-center relative flex-none">
        <div className="text-sm font-semibold">Fonts</div>
        <div
          style={{
            top: '50%',
            transform: 'translateY(-50%)',
          }}
          className="absolute right-0"
        >
          <X size={18} />
        </div>
      </div>
      <div className="flex-none">
        <Input size="sm" placeholder="Search fonts" />
      </div>

      <div className="overflow-scroll flex-1">
        {compactFonts.map((font, index) => (
          <div
            onClick={() => handleSelectFont(font)}
            className="hover:bg-grey-900 px-2 py-1"
            key={index}
          >
            <img
              style={{
                filter: 'invert(100%)',
              }}
              src={font.default.preview}
              alt={font.family}
            />
          </div>
        ))}
      </div>
    </Draggable>
  );
}
