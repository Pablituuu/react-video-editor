import { Player } from "./player";
import InfiniteViewer from "@interactify/infinite-viewer";
import { useEffect, useRef, useState } from "react";
import useStore from "../../store/store";
import Selection from "@interactify/selection";
import Moveable from "@interactify/moveable";
import { getIdFromClassName } from "@/utils/scene";
import StateManager from "@designcombo/state";
import { EDIT_OBJECT, dispatch } from "@designcombo/events";
import {
  SelectionInfo,
  emptySelection,
  getSelectionByIds,
} from "./utils/target";
import { getCurrentTime } from "@/utils/time";
const size = {
  width: 1080,
  height: 1920,
};

let holdGroupPosition: Record<string, any> | null = null;
let dragStartEnd = false;

export default function Scene({
  stateManager,
}: {
  stateManager: StateManager;
}) {
  const [zoom, setZoom] = useState(0.01);
  const viewerRef = useRef<InfiniteViewer>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [targets, setTargets] = useState<HTMLDivElement[]>([]);
  const { activeIds, setState, trackItemDetailsMap, trackItemsMap, playerRef } =
    useStore();
  const moveableRef = useRef<Moveable>(null);
  const [selectionInfo, setSelectionInfo] =
    useState<SelectionInfo>(emptySelection);

  useEffect(() => {
    const infinityViewer = viewerRef.current!;
    const container = containerRef.current!;

    infinityViewer.infiniteViewer.scrollCenter();

    const PADDING = 136;

    const containerHeight = container.clientHeight - PADDING;
    const containerWidth = container.clientWidth - PADDING;
    const width = size.width;
    const height = size.height;

    const desiredZoom = Math.min(
      containerWidth / width,
      containerHeight / height
    );
    setZoom(desiredZoom);
  }, [size]);

  // select elements based on active ids and player seek time
  useEffect(() => {
    const updateTargets = (time?: number) => {
      const currentTime = time || getCurrentTime();
      const { trackItemsMap } = useStore.getState();
      const targetIds = activeIds.filter((id) => {
        return (
          trackItemsMap[id].display.from <= currentTime &&
          trackItemsMap[id].display.to >= currentTime
        );
      });
      const selInfo = getSelectionByIds(targetIds);

      setSelectionInfo(selInfo);
      setTargets(selInfo.targets as HTMLDivElement[]);
    };
    const timer = setTimeout(() => {
      updateTargets();
    });

    const onSeeked = (v: any) => {
      setTimeout(() => {
        const { fps } = useStore.getState();
        const seekedTime = (v.detail.frame / fps) * 1000;
        updateTargets(seekedTime);
      });
    };
    playerRef?.current?.addEventListener("seeked", onSeeked);

    return () => {
      playerRef?.current?.removeEventListener("seeked", onSeeked);

      clearTimeout(timer);
    };
  }, [activeIds, playerRef, trackItemsMap]);

  useEffect(() => {
    const selection = new Selection({
      container: viewerRef.current?.infiniteViewer.getContainer(),
      boundContainer: true,
      hitRate: 0,
      selectableTargets: [".designcombo-scene-item"],
      selectFromInside: false,
      selectByClick: true,
      toggleContinueSelect: "shift",
    })
      .on("select", (e) => {
        const ids = e.selected.map((el) => getIdFromClassName(el.className));
        setTargets(e.selected as HTMLDivElement[]);

        stateManager.updateState(
          {
            activeIds: ids,
          },
          {
            updateHistory: false,
            kind: "layer:selection",
          }
        );
      })
      .on("dragStart", (e) => {
        const target = e.inputEvent.target as HTMLDivElement;
        dragStartEnd = false;

        if (targets.includes(target)) {
          e.stop();
        }
        if (
          target &&
          moveableRef?.current?.moveable.isMoveableElement(target)
        ) {
          e.stop();
        }
      })
      .on("dragEnd", () => {
        dragStartEnd = true;
      })
      .on("selectEnd", (e) => {
        const moveable = moveableRef.current;
        if (e.isDragStart) {
          e.inputEvent.preventDefault();
          setTimeout(() => {
            if (!dragStartEnd) {
              moveable?.moveable.dragStart(e.inputEvent);
            }
          });
        } else {
          const targets = e.selected as HTMLDivElement[];
          const ids = targets.map((el) => getIdFromClassName(el.className));

          stateManager.updateState(
            {
              activeIds: ids,
            },
            {
              updateHistory: false,
              kind: "layer:selection",
            }
          );
          setTargets(targets);
        }
      });

    return () => {
      selection.destroy();
    };
  }, []);

  useEffect(() => {
    const activeSelectionSubscription = stateManager.subscribeToActiveIds(
      (newState) => {
        setState(newState);
      }
    );

    return () => {
      activeSelectionSubscription.unsubscribe();
    };
  }, []);

  // Effect to handle keyboard events
  useEffect(() => {
    const viewerEl =
      viewerRef.current?.infiniteViewer.getContainer() as HTMLDivElement;
    viewerEl.tabIndex = 0;
    viewerEl.style.outline = "none";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space" && document.activeElement !== viewerEl) {
        event.preventDefault(); // Prevent scrolling on spacebar
      }
    };

    // Add event listener to the viewerEl
    if (viewerEl) {
      viewerEl.addEventListener("keydown", handleKeyDown);
    }

    // Cleanup event listener on unmount
    return () => {
      if (viewerEl) {
        viewerEl.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, []);

  useEffect(() => {
    moveableRef.current!.moveable.updateRect();
  }, [trackItemsMap]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        flex: 1,
      }}
      ref={containerRef}
    >
      <InfiniteViewer
        ref={viewerRef}
        className="player-container bg-scene"
        displayHorizontalScroll={false}
        displayVerticalScroll={false}
        zoom={zoom}
        usePinch={true}
        pinchThreshold={50}
        onPinch={(e) => {
          setZoom(e.zoom);
        }}
      >
        <div
          id="artboard"
          style={{
            pointerEvents: "auto",
            width: size.width,
            height: size.height,
            background: "#000000",
            marginTop: 14,
          }}
          className="designcombo_scene"
        >
          <Player />
          <Moveable
            ref={moveableRef}
            renderDirections={selectionInfo.controls}
            {...selectionInfo.ables}
            origin={false}
            target={targets}
            zoom={1 / zoom}
            className="designcombo-scene-moveable"
            onDrag={({ target, top, left }) => {
              target.style.top = top + "px";
              target.style.left = left + "px";
            }}
            onDragEnd={({ target, isDrag }) => {
              if (!isDrag) return;
              const targetId = getIdFromClassName(target.className) as string;

              dispatch(EDIT_OBJECT, {
                payload: {
                  [targetId]: {
                    details: {
                      left: target.style.left,
                      top: target.style.top,
                    },
                  },
                },
              });
            }}
            onScale={({ target, transform, direction }) => {
              const [xControl, yControl] = direction;

              const moveX = xControl === -1;
              const moveY = yControl === -1;

              const scaleRegex = /scale\(([^)]+)\)/;
              const match = target.style.transform.match(scaleRegex)!;
              //get current scale
              const [scaleX, scaleY] = match[1]
                .split(",")
                .map((value) => parseFloat(value.trim()));

              //get new Scale
              const match2 = transform.match(scaleRegex)!;
              const [newScaleX, newScaleY] = match2[1]
                .split(",")
                .map((value) => parseFloat(value.trim()));

              const currentWidth = target.clientWidth * scaleX;
              const currentHeight = target.clientHeight * scaleY;

              const newWidth = target.clientWidth * newScaleX;
              const newHeight = target.clientHeight * newScaleY;

              target.style.transform = transform;

              //Move element to initial Left position
              const diffX = currentWidth - newWidth;
              let newLeft = parseFloat(target.style.left) - diffX / 2;

              const diffY = currentHeight - newHeight;
              let newTop = parseFloat(target.style.top) - diffY / 2;

              if (moveX) {
                newLeft += diffX;
              }
              if (moveY) {
                newTop += diffY;
              }
              target.style.left = newLeft + "px";
              target.style.top = newTop + "px";
            }}
            onScaleEnd={({ target }) => {
              if (!target.style.transform) return;
              const targetId = getIdFromClassName(target.className) as string;

              dispatch(EDIT_OBJECT, {
                payload: {
                  [targetId]: {
                    details: {
                      transform: target.style.transform,
                      left: parseFloat(target.style.left),
                      top: parseFloat(target.style.top),
                    },
                  },
                },
              });
            }}
            onRotate={({ target, transform }) => {
              target.style.transform = transform;
            }}
            onRotateEnd={({ target }) => {
              if (!target.style.transform) return;
              const targetId = getIdFromClassName(target.className) as string;
              dispatch(EDIT_OBJECT, {
                payload: {
                  [targetId]: {
                    details: {
                      details: {
                        transform: target.style.transform,
                      },
                    },
                  },
                },
              });
            }}
            onDragGroup={({ events }) => {
              holdGroupPosition = {};
              for (let i = 0; i < events.length; i++) {
                const event = events[i];
                const id = getIdFromClassName(event.target.className);
                const trackItem = trackItemDetailsMap[id];
                const left =
                  parseFloat(trackItem?.details.left as string) +
                  event.beforeTranslate[0];
                const top =
                  parseFloat(trackItem?.details.top as string) +
                  event.beforeTranslate[1];
                event.target.style.left = `${left}px`;
                event.target.style.top = `${top}px`;
                holdGroupPosition[id] = {
                  left: left,
                  top: top,
                };
              }
            }}
            onResize={({
              target,
              width: nextWidth,
              height: nextHeight,
              direction,
            }) => {
              if (direction[1] === 1) {
                const currentWidth = target.clientWidth;
                const currentHeight = target.clientHeight;

                // get new width and height,
                const scaleY = nextHeight / currentHeight;

                const scale = scaleY;

                target.style.width = currentWidth * scale + "px";
                target.style.height = currentHeight * scale + "px";

                // get new font size

                let fontSize = parseFloat(getComputedStyle(target).fontSize);
                target.style.fontSize = fontSize * scale + "px";
              } else {
                target.style.width = nextWidth + "px";
                target.style.height = nextHeight + "px";
              }
            }}
            onResizeEnd={({ target }) => {
              const targetId = getIdFromClassName(target.className) as string;
              dispatch(EDIT_OBJECT, {
                payload: {
                  [targetId]: {
                    details: {
                      width: parseFloat(target.style.width),
                      height: parseFloat(target.style.height),
                      fontSize: parseFloat(target.style.fontSize),
                    },
                  },
                },
              });
            }}
            onDragGroupEnd={() => {
              if (holdGroupPosition) {
                const payload: Record<string, Partial<any>> = {};
                Object.keys(holdGroupPosition).forEach((id) => {
                  const left = holdGroupPosition![id].left;
                  const top = holdGroupPosition![id].top;
                  payload[id] = {
                    details: {
                      top: `${top}px`,
                      left: `${left}px`,
                    },
                  };
                });
                dispatch(EDIT_OBJECT, {
                  payload: payload,
                });
                holdGroupPosition = null;
              }
            }}
          />
        </div>
      </InfiniteViewer>
    </div>
  );
}
