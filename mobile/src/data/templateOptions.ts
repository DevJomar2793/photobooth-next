import type { ImageSourcePropType } from "react-native";

export const TEMPLATE_WIDTH = 543;
export const TEMPLATE_HEIGHT = 724;

export interface PhotoSlot {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface TemplateOption {
  id: string;
  name: string;
  title: string;
  image: ImageSourcePropType;
  photoSlots: PhotoSlot[];
}

export const templateOptions: TemplateOption[] = [
  {
    id: "classic",
    name: "Classic",
    title: "Good Vibes",
    image: require("../../assets/images/templates/good-vibes.png"),
    photoSlots: [
      { x: 48, y: 62, width: 219, height: 253 },
      { x: 276, y: 62, width: 220, height: 253 },
      { x: 48, y: 324, width: 219, height: 244 },
      { x: 276, y: 324, width: 220, height: 244 },
    ],
  },
  {
    id: "best-friends",
    name: "Best Friends",
    title: "Best Friends",
    image: require("../../assets/images/templates/best-friends.png"),
    photoSlots: [
      { x: 47, y: 59, width: 220, height: 261 },
      { x: 277, y: 59, width: 220, height: 261 },
      { x: 47, y: 330, width: 220, height: 244 },
      { x: 277, y: 330, width: 220, height: 244 },
    ],
  },
  {
    id: "school-life",
    name: "School Life",
    title: "School Life",
    image: require("../../assets/images/templates/school-life.png"),
    photoSlots: [
      { x: 48, y: 63, width: 219, height: 250 },
      { x: 277, y: 63, width: 219, height: 250 },
      { x: 48, y: 323, width: 219, height: 252 },
      { x: 277, y: 323, width: 219, height: 252 },
    ],
  },
  {
    id: "film-strip",
    name: "Film Strip",
    title: "Good Memories",
    image: require("../../assets/images/templates/good-memories.png"),
    photoSlots: [
      { x: 58, y: 66, width: 209, height: 262 },
      { x: 276, y: 66, width: 209, height: 262 },
      { x: 58, y: 338, width: 209, height: 258 },
      { x: 276, y: 338, width: 209, height: 258 },
    ],
  },
  {
    id: "cute-doodles",
    name: "Cute Doodles",
    title: "Capture Good Vibes!",
    image: require("../../assets/images/templates/capture-good-vibes.png"),
    photoSlots: [
      { x: 47, y: 46, width: 220, height: 250 },
      { x: 277, y: 46, width: 220, height: 250 },
      { x: 47, y: 303, width: 220, height: 243 },
      { x: 277, y: 303, width: 220, height: 243 },
    ],
  },
  {
    id: "colorful",
    name: "Colorful",
    title: "Friends Forever",
    image: require("../../assets/images/templates/friends-forever.png"),
    photoSlots: [
      { x: 34, y: 45, width: 233, height: 264 },
      { x: 276, y: 45, width: 234, height: 264 },
      { x: 34, y: 317, width: 233, height: 263 },
      { x: 276, y: 317, width: 234, height: 263 },
    ],
  },
  {
    id: "notebook",
    name: "Notebook",
    title: "School Memories",
    image: require("../../assets/images/templates/school-memories.png"),
    photoSlots: [
      { x: 47, y: 73, width: 220, height: 258 },
      { x: 277, y: 73, width: 220, height: 258 },
      { x: 47, y: 340, width: 220, height: 243 },
      { x: 277, y: 340, width: 220, height: 243 },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    title: "Make It Special",
    image: require("../../assets/images/templates/make-it-special.png"),
    photoSlots: [
      { x: 29, y: 59, width: 239, height: 254 },
      { x: 277, y: 59, width: 238, height: 254 },
      { x: 29, y: 321, width: 239, height: 256 },
      { x: 277, y: 321, width: 238, height: 256 },
    ],
  },
];
