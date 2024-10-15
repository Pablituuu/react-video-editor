import { TIMELINE_ZOOM_LEVELS } from "@/constants/scale";
import { findIndex } from "./search";
import { FRAME_INTERVAL, PREVIEW_FRAME_WIDTH } from "@/constants";
import { ITimelineScaleState } from "@designcombo/types";

export function getPreviousZoomLevel(
  currentZoom: ITimelineScaleState
): ITimelineScaleState {
  return TIMELINE_ZOOM_LEVELS[getPreviousZoomIndex(currentZoom)];
}

export function getNextZoomLevel(
  currentZoom: ITimelineScaleState
): ITimelineScaleState {
  return TIMELINE_ZOOM_LEVELS[getNextZoomIndex(currentZoom)];
}

export function getPreviousZoomIndex(currentZoom: ITimelineScaleState): number {
  const lastLevel = TIMELINE_ZOOM_LEVELS.at(-1);
  const isLastIndex = currentZoom === lastLevel;
  const nextZoomIndex = getNextZoomIndex(currentZoom);
  const previousZoomIndex = nextZoomIndex - (isLastIndex ? 1 : 2);

  // Limit zoom to the first default level.
  return Math.max(0, previousZoomIndex);
}

export function getNextZoomIndex(currentZoom: ITimelineScaleState): number {
  const nextZoomIndex = findIndex(TIMELINE_ZOOM_LEVELS, (level) => {
    return level.zoom > currentZoom.zoom;
  });

  // Limit zoom to the last default level.
  return Math.min(TIMELINE_ZOOM_LEVELS.length - 1, nextZoomIndex);
}

export function timeMsToUnits(timeMs: number, zoom = 1): number {
  const zoomedFrameWidth = PREVIEW_FRAME_WIDTH * zoom;
  const frames = timeMs * (60 / 1000);

  return frames * zoomedFrameWidth;
}

export function unitsToTimeMs(units: number, zoom = 1): number {
  const zoomedFrameWidth = PREVIEW_FRAME_WIDTH * zoom;

  const frames = units / zoomedFrameWidth;

  return frames * FRAME_INTERVAL;
}

export function calculateTimelineWidth(
  totalLengthMs: number,
  zoom = 1
): number {
  return timeMsToUnits(totalLengthMs, zoom);
}
