// from iTransition interface, omit fromId, toId
export const TRANSITIONS: Omit<any, "fromId" | "toId" | "trackId">[] = [
  {
    id: "1",
    type: "none",
    duration: 0,
    preview: "https://ik.imagekit.io/wombo/transitions-v2/transition-none.png"
  },
  {
    id: "2",
    type: "fade",
    duration: 0.5,
    preview: "https://ik.imagekit.io/wombo/transitions-v2/fade.webp"
  },
  {
    id: "3",
    type: "slide",
    name: "slide up",
    duration: 0.5,
    preview: "https://ik.imagekit.io/wombo/transitions-v2/slide-up.webp",
    direction: "from-bottom"
  },
  {
    id: "4",
    type: "slide",
    name: "slide down",
    duration: 0.5,
    preview: "https://ik.imagekit.io/wombo/transitions-v2/slide-down.webp",
    direction: "from-top"
  },
  {
    id: "5",
    type: "slide",
    name: "slide left",
    duration: 0.5,
    preview: "https://ik.imagekit.io/wombo/transitions-v2/slide-left.webp",
    direction: "from-right"
  },
  {
    id: "6",
    type: "slide",
    name: "slide right",
    duration: 0.5,
    preview: "https://ik.imagekit.io/wombo/transitions-v2/slide-right.webp",
    direction: "from-left"
  },
  {
    id: "7",
    type: "wipe",
    name: "wipe up",
    duration: 0.5,
    preview: "https://ik.imagekit.io/wombo/transitions-v2/wipe-up.webp",
    direction: "from-bottom"
  },
  {
    id: "8",
    type: "wipe",
    name: "wipe down",
    duration: 0.5,
    preview: "https://ik.imagekit.io/wombo/transitions-v2/wipe-down.webp",
    direction: "from-top"
  },
  {
    id: "9",
    type: "wipe",
    name: "wipe left",
    duration: 0.5,
    preview: "https://ik.imagekit.io/wombo/transitions-v2/wipe-left.webp",
    direction: "from-right"
  },
  {
    id: "10",
    type: "wipe",
    name: "wipe right",
    duration: 0.5,
    preview: "https://ik.imagekit.io/wombo/transitions-v2/wipe-right.webp",
    direction: "from-left"
  },
  {
    id: "11",
    type: "flip",
    duration: 0.5,
    preview: "https://ik.imagekit.io/wombo/transitions-v2/flip.webp"
  },
  {
    id: "12",
    type: "clockWipe",
    duration: 0.5,
    preview: "https://ik.imagekit.io/wombo/transitions-v2/clock-wipe.webp"
  },
  {
    id: "13",
    type: "star",
    duration: 0.5,
    preview: "https://ik.imagekit.io/wombo/transitions-v2/star.webp"
  },
  {
    id: "14",
    type: "circle",
    duration: 0.5,
    preview: "https://ik.imagekit.io/wombo/transitions-v2/circle.webp"
  },
  {
    id: "15",
    type: "rectangle",
    duration: 0.5,
    preview: "https://ik.imagekit.io/wombo/transitions-v2/rectangle.webp"
  }
];
