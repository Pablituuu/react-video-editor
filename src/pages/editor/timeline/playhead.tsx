import { useCurrentPlayerFrame } from "@/hooks/use-current-frame";
import useStore from "@/store/store";
import { timeMsToUnits, unitsToTimeMs } from "@designcombo/timeline";
import { MouseEvent, TouchEvent, useEffect, useRef, useState } from "react";

const Playhead = ({ scrollLeft }: { scrollLeft: number }) => {
  const playheadRef = useRef<HTMLDivElement>(null);
  const { playerRef, fps, scale } = useStore();
  const currentFrame = useCurrentPlayerFrame(playerRef!);
  const position =
    timeMsToUnits((currentFrame / fps) * 1000, scale.zoom) - scrollLeft;
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartPosition, setDragStartPosition] = useState(position);

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseDown = (
    e:
      | MouseEvent<HTMLDivElement, globalThis.MouseEvent>
      | TouchEvent<HTMLDivElement>
  ) => {
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setDragStartX(clientX);
    setDragStartPosition(position);
  };

  const handleMouseMove = (
    e: globalThis.MouseEvent | globalThis.TouchEvent
  ) => {
    if (isDragging) {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const delta = clientX - dragStartX;
      const newPosition = dragStartPosition + delta;

      const time = unitsToTimeMs(newPosition, scale.zoom);
      playerRef?.current?.seekTo((time * fps) / 1000);
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleMouseMove);
      document.addEventListener("touchend", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleMouseMove);
      document.removeEventListener("touchend", handleMouseUp);
    }

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleMouseMove);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={playheadRef}
      onMouseDown={(e) => handleMouseDown(e)}
      onTouchStart={(e) => handleMouseDown(e)}
      style={{
        position: "absolute",
        left: 40 + position,
        top: 80,
        width: 1,
        height: "calc(100% - 80px)",
        background: "#d4d4d8",
        zIndex: 10,
        cursor: "pointer"
      }}
    >
      <div className="relative h-full">
        <div className="absolute top-0  transform -translate-x-1/2 w-3 h-full "></div>
        <div className="absolute top-0  transform -translate-x-1/2 w-0.5 h-full bg-white/50"></div>

        <div
          style={{
            borderRadius: "0 0 20px 20px"
          }}
          className="absolute transform -translate-x-1/2 px-1.5 h-3"
        >
          <svg height="12" viewBox="0 0 12 12" fill="none">
            <path
              fill="currentColor"
              d="M11.6585 7.04881L6.6585 11.4238C6.28148 11.7537 5.71852 11.7537 5.3415 11.4238L0.341495 7.04881C0.12448 6.85892 0 6.58459 0 6.29623V1C0 0.447715 0.447715 0 1 0H11C11.5523 0 12 0.447715 12 1V6.29623C12 6.58459 11.8755 6.85892 11.6585 7.04881Z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Playhead;
