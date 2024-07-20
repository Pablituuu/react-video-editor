import { ITransition, TRANSITIONS, useEditorState } from '@designcombo/core';
import React from 'react';

export const Transitions = () => {
  return (
    <div>
      <div className="text-md font-medium h-11 border-b border-border flex items-center px-4">
        Transitions
      </div>
      <div className="grid grid-cols-3 gap-2 p-3">
        {TRANSITIONS.map((transition, index) => (
          <TransitionsMenuItem key={index} transition={transition} />
        ))}
      </div>
    </div>
  );
};

const TransitionsMenuItem = ({
  transition,
}: {
  transition: Partial<ITransition>;
}) => {
  const { timelineManager } = useEditorState();
  const divRef = React.useRef<HTMLDivElement>(null);

  const handleDragStart = React.useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      // Set the dragging transition in the timeline manager
      timelineManager.setDraggingTransition(transition, event);

      // Create a custom drag image
      const dragImage = document.createElement('div');
      dragImage.style.backgroundImage = `url(${transition.preview})`;
      dragImage.style.backgroundSize = 'cover';
      dragImage.style.width = '70px'; // Set a width for the drag image
      dragImage.style.height = '70px'; // Set a height for the drag image
      dragImage.style.position = 'absolute';
      dragImage.style.pointerEvents = 'none'; // Prevent interaction with the drag image

      // Append the drag image to the body
      document.body.appendChild(dragImage);

      // Set the drag image to be centered around the pointer
      // event.dataTransfer.setDragImage(dragImage, 35, 35); // Adjust the offset as needed
      event.dataTransfer.setDragImage(new Image(), 35, 35);
      // e.e.dataTransfer.setDragImage(new Image(), 0, 0);

      // Clean up the drag image after the drag operation ends
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', JSON.stringify(transition));

      // Remove the drag image after the drag starts
      setTimeout(() => {
        document.body.removeChild(dragImage);
      }, 0);
    },
    [timelineManager, transition],
  );
  const style = React.useMemo(
    () => ({
      backgroundImage: `url(${transition.preview})`,
      backgroundSize: 'cover',
      width: '70px',
      height: '70px',
    }),
    [transition.preview],
  );

  return (
    <div>
      <div>
        <div
          draggable={true}
          ref={divRef}
          onDragStart={handleDragStart}
          style={style}
          className="draggable"
        />
      </div>
      <div className="text-muted-foreground text-[12px] text-nowrap overflow-ellipsis h-6 flex items-center capitalize">
        {transition.name || transition.type}
      </div>
    </div>
  );
};

export default TransitionsMenuItem;
