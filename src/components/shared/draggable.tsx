import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export function Draggable({
  id,
  data,
  children,
  style,
  className,
}: {
  id: string;
  data: any;
  children: any;
  style: React.CSSProperties;
  className?: React.ComponentProps<'div'>['className'];
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: data,
  });

  return (
    <div
      id={id}
      ref={setNodeRef}
      className={className}
      style={{
        transform: CSS.Translate.toString(transform),
        ...style,
      }}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
}
