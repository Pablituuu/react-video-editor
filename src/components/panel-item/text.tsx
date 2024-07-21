import { useEditorState } from '@designcombo/core';
import { useEffect, useState } from 'react';
import { Textarea } from '../ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { HexColorPicker } from 'react-colorful';
import { Button } from '../ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import {
  ALargeSmall,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Check,
  ChevronsUpDown,
  Italic,
  Underline,
  UnfoldVertical,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { set, upperCase } from 'lodash';
import { Toggle } from '../ui/toggle';
import { ScrollArea } from '../ui/scroll-area';
import { Slider } from '../ui/slider';
import { Input } from '../ui/input';

interface ITextProps {
  backgroundColor: string;
  border: string;
  color: string;
  fontFamily: string;
  fontSize: number;
  fontStyle: string;
  fontWeight: string;
  height: number;
  letterSpacing: string;
  lineHeight: string;
  opacity: number;
  text: string;
  textAlign: string;
  textDecoration: string;
  textShadow: string;
  width: number;
  wordSpacing: string;
}

const defaultProps = {
  backgroundColor: 'transparent',
  border: 'none',
  color: '#ffffff',
  fontFamily: 'Roboto-Bold',
  fontSize: 64,
  fontStyle: 'normal',
  fontWeight: 'normal',
  height: 400,
  letterSpacing: 'normal',
  lineHeight: 'normal',
  opacity: 100,
  text: 'Heading',
  textAlign: 'left',
  textDecoration: 'none',
  textShadow: 'none',
  width: 500,
  wordSpacing: 'normal',
};

const TextProps = () => {
  const { activeIds, trackItemsMap } = useEditorState();
  const [props, setProps] = useState<ITextProps>(defaultProps);
  const [openFontFamily, setOpenFontFamily] = useState(false);
  const [openFontSize, setOpenFontSize] = useState(false);
  const [openTextAlign, setOpenTextAlign] = useState(false);
  const [openTextDistance, setOpenTextDistance] = useState(false);
  const [openFontCase, setOpenFontCase] = useState(false);
  const [textColor, setTextColor] = useState('rgba(255,255,255,1)');
  const [strokeColor, setStrokeColor] = useState('rgba(255,255,255,1)');
  const [openStrokeColor, setOpenStrokeColor] = useState(false);
  const [openTextColor, setOpenTextColor] = useState(false);
  const [backgorundColor, setBackgorundColor] = useState('rgba(255,255,255,1)');
  const [openBackgroundColor, setOpenBackgroundColor] = useState(false);
  const [shadowColor, setShadowColor] = useState('rgba(255,255,255,1)');
  const [openShadowColor, setOpenShadowColor] = useState(false);
  const fontFamilyTypes = [
    {
      value: 'next.js',
      label: 'Next.js',
    },
    {
      value: 'sveltekit',
      label: 'SvelteKit',
    },
    {
      value: 'nuxt.js',
      label: 'Nuxt.js',
    },
    {
      value: 'remix',
      label: 'Remix',
    },
    {
      value: 'astro',
      label: 'Astro',
    },
    {
      value: 'Roboto-Bold',
      label: 'Roboto-Bold',
    },
  ];
  const textAlignTypes = [
    { icon: <AlignLeft />, type: 'left' },
    { icon: <AlignCenter />, type: 'center' },
    { icon: <AlignRight />, type: 'right' },
  ];
  const fontSizeTypes = [64, 72, 80, 96, 128, 144, 160, 192, 256, 288, 320];
  const fontCaseTypes = ['Lowecase', 'Uppercase', 'Sentence case'];

  useEffect(() => {
    const [id] = activeIds;
    const trackItem = trackItemsMap[id];
    if (trackItem) {
      setProps(trackItem.details as ITextProps);
    }
  }, [activeIds]);
  return (
    <div className="flex flex-col overflor-auto">
      <div className="text-md text-[#e4e4e7] font-medium h-11 border-b  border-border flex items-center px-4 text-muted-foreground">
        Properties
      </div>
      <div className="flex flex-col gap-2 p-4">
        <Textarea
          placeholder="Type your message here."
          defaultValue={props?.text}
        />
        <div className="flex gap-2">
          <Popover open={openFontFamily} onOpenChange={setOpenFontFamily}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openFontFamily}
                className="w-[200px] justify-between"
              >
                {props?.fontFamily
                  ? fontFamilyTypes.find(
                      (framework) => framework.value === props?.fontFamily,
                    )?.label
                  : 'Select framework...'}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              style={{ zIndex: 300 }}
              className="flex w-[200px] p-0"
            >
              <Command>
                <CommandGroup>
                  <CommandList>
                    {fontFamilyTypes.map((fontFamilyType) => (
                      <CommandItem
                        key={fontFamilyType.value}
                        defaultValue={props?.fontFamily}
                        value={fontFamilyType.value}
                        onSelect={(currentValue) => {
                          setProps({ ...props, fontFamily: currentValue });
                          setOpenFontFamily(false);
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            props?.fontFamily === fontFamilyType.value
                              ? 'opacity-100'
                              : 'opacity-0',
                          )}
                        />
                        {fontFamilyType.label}
                      </CommandItem>
                    ))}
                  </CommandList>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <Popover open={openFontSize} onOpenChange={setOpenFontSize}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openFontSize}
                className="w-[80px] justify-between"
              >
                {props?.fontFamily
                  ? fontSizeTypes.find(
                      (fontSize) => fontSize === props?.fontSize,
                    )
                  : 'Select Size...'}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              style={{ zIndex: 300 }}
              className="flex w-[80px] p-0"
            >
              <Command>
                <CommandGroup>
                  <CommandList>
                    <ScrollArea>
                      {fontSizeTypes.map((fontSize) => (
                        <CommandItem
                          key={fontSize}
                          defaultValue={props?.fontSize}
                          value={String(fontSize)}
                          onSelect={(currentValue) => {
                            setProps({
                              ...props,
                              fontSize: Number(currentValue),
                            });
                            setOpenFontSize(false);
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              props?.fontSize === fontSize
                                ? 'opacity-100'
                                : 'opacity-0',
                            )}
                          />
                          {fontSize}
                        </CommandItem>
                      ))}
                    </ScrollArea>
                  </CommandList>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="grid grid-cols-6">
          <Toggle size="sm" className="w-[45px]" variant="outline">
            <Bold />
          </Toggle>
          <Toggle size="sm" className="w-[45px]" variant="outline">
            <Italic />
          </Toggle>
          <Toggle size="sm" className="w-[45px]" variant="outline">
            <Underline />
          </Toggle>
          <Popover open={openTextAlign} onOpenChange={setOpenTextAlign}>
            <PopoverTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                role="combobox"
                aria-expanded={openTextAlign}
                className="w-[45px] justify-between"
              >
                {props?.textAlign
                  ? textAlignTypes.find(
                      (textAlign) => textAlign.type === props?.textAlign,
                    ).icon
                  : 'Select Text Align...'}
              </Button>
            </PopoverTrigger>
            <PopoverContent style={{ zIndex: 300 }} className="flex w-auto p-0">
              {textAlignTypes.map((textAlign, i) => (
                <Toggle key={i}>{textAlign.icon}</Toggle>
              ))}
            </PopoverContent>
          </Popover>
          <Popover open={openFontCase} onOpenChange={setOpenFontCase}>
            <PopoverTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                role="combobox"
                aria-expanded={openFontCase}
                className="w-[45px] justify-between"
              >
                <ALargeSmall />
              </Button>
            </PopoverTrigger>
            <PopoverContent style={{ zIndex: 300 }} className="flex w-auto p-0">
              <div className="flex flex-col">
                {fontCaseTypes.map((fontCase, i) => (
                  <Button variant="ghost" key={i}>
                    {fontCase}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <Popover open={openTextDistance} onOpenChange={setOpenTextDistance}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                size="sm"
                aria-expanded={openTextDistance}
                className="w-[45px] justify-between"
              >
                <UnfoldVertical />
              </Button>
            </PopoverTrigger>
            <PopoverContent style={{ zIndex: 300 }} className="flex w-auto p-0">
              <div className="flex flex-col">
                {fontCaseTypes.map((fontCase, i) => (
                  <Button variant="ghost" key={i}>
                    {fontCase}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="grid grid-cols-2 items-center">
          <div className="text-md text-[#e4e4e7] font-medium flex items-center text-muted-foreground">
            Text Color
          </div>
          <div className="flex justify-center">
            <Popover open={openTextColor} onOpenChange={setOpenTextColor}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openTextColor}
                  style={{ backgroundColor: textColor }}
                  className="w-[40px] justify-between"
                />
              </PopoverTrigger>
              <PopoverContent
                style={{ zIndex: 300 }}
                className="flex w-auto p-3"
              >
                <HexColorPicker color={textColor} onChange={setTextColor} />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="grid grid-cols-2 items-center">
          <div className="text-md text-[#e4e4e7] font-medium flex items-center text-muted-foreground">
            Stroke Color
          </div>
          <div className="flex justify-center">
            <Popover open={openStrokeColor} onOpenChange={setOpenStrokeColor}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openStrokeColor}
                  style={{ backgroundColor: strokeColor }}
                  className="w-[40px] justify-between"
                />
              </PopoverTrigger>
              <PopoverContent
                style={{ zIndex: 300 }}
                className="flex w-auto p-3"
              >
                <HexColorPicker color={strokeColor} onChange={setStrokeColor} />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="grid grid-cols-2 items-center">
          <div className="text-md text-[#e4e4e7] font-medium flex items-center text-muted-foreground">
            Background Color
          </div>
          <div className="flex justify-center">
            <Popover
              open={openBackgroundColor}
              onOpenChange={setOpenBackgroundColor}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openBackgroundColor}
                  style={{ backgroundColor: backgorundColor }}
                  className="w-[40px] justify-between"
                />
              </PopoverTrigger>
              <PopoverContent
                style={{ zIndex: 300 }}
                className="flex w-auto p-3"
              >
                <HexColorPicker
                  color={backgorundColor}
                  onChange={setBackgorundColor}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="grid grid-cols-2 items-center">
          <div className="text-md text-[#e4e4e7] font-medium flex items-center text-muted-foreground">
            Shadow Color
          </div>
          <div className="flex justify-center">
            <Popover open={openShadowColor} onOpenChange={setOpenShadowColor}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openShadowColor}
                  style={{ backgroundColor: shadowColor }}
                  className="w-[40px] justify-between"
                />
              </PopoverTrigger>
              <PopoverContent
                style={{ zIndex: 300 }}
                className="flex w-auto p-3"
              >
                <HexColorPicker color={shadowColor} onChange={setShadowColor} />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="grid grid-cols-4 items-center">
          <div className="text-md text-[#e4e4e7] font-medium flex items-center text-muted-foreground">
            Opacity
          </div>
          <div>
            <Input size="sm" />
          </div>
          <div className="flex justify-center col-span-2">
            <Slider
              defaultValue={[50]}
              max={100}
              step={1}
              className={cn('w-[60%]')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextProps;
