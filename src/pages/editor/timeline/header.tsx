import { Button } from "@/components/ui/button";
import {
  ACTIVE_SPLIT,
  LAYER_DELETE,
  PLAYER_PAUSE,
  PLAYER_PLAY,
  TIMELINE_SCALE_CHANGED,
  dispatch
} from "@designcombo/events";
import { frameToTimeString, getCurrentTime, timeToString } from "@/utils/time";
import useStore from "@/store/store";
import { SquareSplitHorizontal, Trash, ZoomIn, ZoomOut } from "lucide-react";
import { getNextZoomLevel, getPreviousZoomLevel } from "@/utils/timeline";
import { useCurrentPlayerFrame } from "@/hooks/use-current-frame";
import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconPlayerSkipBack,
  IconPlayerSkipForward
} from "@tabler/icons-react";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";
const Header = () => {
  const [playing, setPlaying] = useState(false);
  const { duration, fps, scale, playerRef, activeIds } = useStore();
  const currentFrame = useCurrentPlayerFrame(playerRef!);

  const onZoomOutClick = () => {
    const previousZoom = getPreviousZoomLevel(scale);
    dispatch(TIMELINE_SCALE_CHANGED, {
      payload: {
        scale: previousZoom
      }
    });
  };

  // const handleDeselect = () => {
  //   dispatch(LAYER_SELECT, { payload: { trackItemIds: [] } });
  // };

  const onZoomInClick = () => {
    const nextZoom = getNextZoomLevel(scale);

    dispatch(TIMELINE_SCALE_CHANGED, {
      payload: {
        scale: nextZoom
      }
    });
  };

  // const handleFitTimeline = () => {
  //   dispatch(TIMELINE_FIT);
  // };

  const doActiveDelete = () => {
    dispatch(LAYER_DELETE);
  };

  const doActiveSplit = () => {
    dispatch(ACTIVE_SPLIT, {
      payload: {},
      options: {
        time: getCurrentTime()
      }
    });
  };

  // const doActiveClone = () => {
  //   dispatch(ACTIVE_CLONE);
  // };

  const handlePlay = () => {
    dispatch(PLAYER_PLAY);
  };

  const handlePause = () => {
    dispatch(PLAYER_PAUSE);
  };

  // const handlePaste = () => {
  //   dispatch(ACTIVE_PASTE);
  // };

  // check if the player is playing
  useEffect(() => {
    playerRef?.current?.addEventListener("play", () => {
      setPlaying(true);
    });
    playerRef?.current?.addEventListener("pause", () => {
      setPlaying(false);
    });
    return () => {
      playerRef?.current?.removeEventListener("play", () => {
        setPlaying(true);
      });
      playerRef?.current?.removeEventListener("pause", () => {
        setPlaying(false);
      });
    };
  }, [playerRef]);

  return (
    <div
      style={{
        position: "relative",
        height: "50px",
        boxShadow: "inset 0 1px 0 0 #27272a",
        flex: "none"
      }}
      className="bg-background"
    >
      <div
        style={{
          position: "absolute",
          height: 50,
          width: "100%",
          display: "flex",
          alignItems: "center"
        }}
      >
        <div
          style={{
            height: 36,
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 260px 1fr",
            alignItems: "center"
          }}
        >
          <div className="px-2 flex">
            <Button
              disabled={!activeIds.length}
              onClick={doActiveDelete}
              variant={"ghost"}
              size={"sm"}
              className="flex items-center gap-1 px-2"
            >
              <Trash size={14} /> Delete
            </Button>

            <Button
              disabled={!activeIds.length}
              onClick={doActiveSplit}
              variant={"ghost"}
              size={"sm"}
              className="flex items-center gap-1 px-2"
            >
              <SquareSplitHorizontal size={15} /> Split
            </Button>
          </div>
          <div className="flex items-center justify-center">
            <div>
              <Button onClick={doActiveDelete} variant={"ghost"} size={"icon"}>
                <IconPlayerSkipBack size={14} />
              </Button>
              <Button
                onClick={() => {
                  if (playing) {
                    return handlePause();
                  }
                  handlePlay();
                }}
                variant={"ghost"}
                size={"icon"}
              >
                {playing ? (
                  <IconPlayerPauseFilled size={14} />
                ) : (
                  <IconPlayerPlayFilled size={14} />
                )}
              </Button>
              <Button onClick={doActiveSplit} variant={"ghost"} size={"icon"}>
                <IconPlayerSkipForward size={14} />
              </Button>
            </div>
            <div
              className="text-xs font-light"
              style={{
                display: "grid",
                alignItems: "center",
                gridTemplateColumns: "54px 4px 54px",
                paddingTop: "2px",
                justifyContent: "center"
              }}
            >
              <div
                className="text-zinc-200 font-medium"
                style={{
                  display: "flex",
                  justifyContent: "center"
                }}
                data-current-time={currentFrame / fps}
                id="video-current-time"
              >
                {frameToTimeString({ frame: currentFrame }, { fps })}
              </div>
              <span>/</span>
              <div
                className="text-muted-foreground"
                style={{
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                {timeToString({ time: duration })}
              </div>
            </div>
          </div>

          <div className="flex justify-end items-center ">
            <div className="flex  border-l border-border pl-4 pr-2">
              <Button size={"icon"} variant={"ghost"} onClick={onZoomOutClick}>
                <ZoomOut size={16} />
              </Button>
              <Slider className="w-28" defaultValue={[10]} />
              <Button size={"icon"} variant={"ghost"} onClick={onZoomInClick}>
                <ZoomIn size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
