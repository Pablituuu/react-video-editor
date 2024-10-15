import { ITimelineScaleState } from "@designcombo/types";

export const CURSOR_WIDTH = 12;
export const CURSOR_CENTER = CURSOR_WIDTH / 2 - 2;
export const TRACK_PADDING = 20;

export const TIMELINE_ZOOM_LEVELS: ITimelineScaleState[] = [
  {
    // 1x distance (minute 0 to minute 5, 5 segments).
    unit: 18000,
    zoom: 1 / 12000,
    segments: 5
  },
  {
    // 1x distance (minute 0 to minute 3, 3 segments).
    unit: 10800,
    zoom: 1 / 7200,
    segments: 3
  },
  {
    // 1x distance (minute 0 to minute 2, 2 segments).
    unit: 7200,
    zoom: 1 / 6000,
    segments: 2
  },
  {
    // 1x distance (minute 0 to minute 1, 1 segment).
    unit: 3600,
    zoom: 1 / 3000,
    segments: 1
  },
  {
    // 1x distance (second 0 to second 30, 2 segments).
    unit: 1800,
    zoom: 1 / 1200,
    segments: 2
  },
  {
    // 1x distance (second 0 to second 15, 3 segments).
    unit: 900,
    zoom: 1 / 600,
    segments: 3
  },
  {
    // 1x distance (second 0 to second 10, 2 segments).
    unit: 600,
    zoom: 1 / 450,
    segments: 2
  },
  {
    // 1x distance (second 0 to second 5, 5 segments).
    unit: 300,
    zoom: 1 / 240,
    segments: 5
  },
  {
    // 1x distance (second 0 to second 3, 3 segments).
    unit: 180,
    zoom: 1 / 150,
    segments: 3
  },
  {
    // 1x distance (second 0 to second 2, 2 segments).
    unit: 120,
    zoom: 1 / 120,
    segments: 10
  },
  {
    // 1x distance (second 0 to second 1, 1 segment).
    unit: 60,
    zoom: 1 / 90,
    segments: 5
  },

  {
    // 1x distance (second 0 to second 1, 1 segment).
    unit: 60,
    zoom: 1 / 60,
    segments: 5
  },
  {
    // 1x distance (frame 0 to frame 30, 2 segments).
    unit: 30,
    zoom: 1 / 30,
    segments: 2
  },
  {
    // 1x distance (frame 0 to frame 15, 3 segments).
    unit: 15,
    zoom: 1 / 15,
    segments: 3
  },
  {
    // 1x distance (frame 0 to frame 10, 2 segments).
    unit: 10,
    zoom: 1 / 10,
    segments: 2
  },
  {
    // 1x distance (frame 0 to frame 5, 5 segments).
    unit: 5,
    zoom: 1 / 5,
    segments: 5
  },
  {
    // 1x distance (frame 0 to frame 3, 3 segments).
    unit: 3,
    zoom: 1 / 3,
    segments: 3
  },
  {
    // 1x distance (frame 0 to frame 2, 2 segments).
    unit: 2,
    zoom: 1 / 2,
    segments: 5
  },
  {
    // 1x distance (frame 0 to frame 1, 1 segment).
    unit: 1,
    zoom: 1,
    segments: 5
  },
  {
    // 2x distance (frame 0 to frame 1, 1 segment).
    unit: 1,
    zoom: 3,
    segments: 5
  },
  {
    // 4x distance (frame 0 to frame 1, 1 segment).
    unit: 1,
    zoom: 4,
    segments: 10
  }
];
