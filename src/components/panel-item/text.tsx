import { useEditorState } from '@designcombo/core';
import { useEffect, useState } from 'react';
import { Textarea } from '../ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { set } from 'lodash';

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
  const fontSizeTypes = [64, 72, 80, 96, 128, 144, 160, 192, 256, 288, 320];

  useEffect(() => {
    const [id] = activeIds;
    const trackItem = trackItemsMap[id];
    if (trackItem) {
      setProps(trackItem.details as ITextProps);
    }
  }, [activeIds]);
  return (
    <div>
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
                    {fontSizeTypes.map((fontSize) => (
                      <CommandItem
                        key={fontSize}
                        defaultValue={props?.fontSize}
                        value={fontSize}
                        onSelect={(currentValue) => {
                          setProps({ ...props, fontSize: currentValue });
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
                  </CommandList>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default TextProps;
