import useLayoutStore from '@/store/use-layout-store';
import { useEditorState } from '@designcombo/core';
import { useEffect, useState } from 'react';
import Animations from './animations';
import TextProps from './text';
import Zap from './zap';
import { ScrollArea } from '../ui/scroll-area';

const Container = ({ children }: { children: React.ReactNode }) => {
  const { showToolboxItem, setShowToolboxItem, setActiveToolboxItem } =
    useLayoutStore();
  const { activeIds } = useEditorState();
  const [showToolbox, setShowToolbox] = useState<string | null>(null);

  useEffect(() => {
    if (activeIds.length === 1 && showToolboxItem && showToolbox === null) {
      setShowToolbox(activeIds[0]);
    } else {
      setShowToolbox(null);
      setShowToolboxItem(false);
      setActiveToolboxItem(null);
    }
  }, [activeIds, showToolboxItem]);

  if (!showToolbox) {
    return;
  }

  return (
    <div
      style={{
        right: showToolboxItem ? '73px' : '-100%',
        transition: 'right 0.25s ease-in-out',
        zIndex: 200,
      }}
      className="w-80 h-[calc(100%-32px)]  absolute top-1/2 -translate-y-1/2 rounded-lg shadow-lg flex"
    >
      <div className="flex-1 relative bg-zinc-950">
        <ScrollArea className="h-full w-full rounded-md border">
          {children}
        </ScrollArea>
      </div>
    </div>
  );
};

const ActiveToolboxlItem = () => {
  const { activeToolboxItem } = useLayoutStore();

  if (activeToolboxItem === 'text') {
    return <TextProps />;
  }
  if (activeToolboxItem === 'zap') {
    return <Zap />;
  }
  if (activeToolboxItem === 'animation') {
    return <Animations />;
  }
};

export const ToolboxlItem = () => {
  return (
    <Container>
      <ActiveToolboxlItem />
    </Container>
  );
};
