import type { ImageSourcePropType } from "react-native";

export interface TemplateOption {
  id: string;
  name: string;
  title: string;
  image: ImageSourcePropType;
}

export const templateOptions: TemplateOption[] = [
  {
    id: "classic",
    name: "Classic",
    title: "Good Vibes",
    image: require("../../assets/images/templates/good-vibes.png"),
  },
  {
    id: "best-friends",
    name: "Best Friends",
    title: "Best Friends",
    image: require("../../assets/images/templates/best-friends.png"),
  },
  {
    id: "school-life",
    name: "School Life",
    title: "School Life",
    image: require("../../assets/images/templates/school-life.png"),
  },
  {
    id: "film-strip",
    name: "Film Strip",
    title: "Good Memories",
    image: require("../../assets/images/templates/good-memories.png"),
  },
  {
    id: "cute-doodles",
    name: "Cute Doodles",
    title: "Capture Good Vibes!",
    image: require("../../assets/images/templates/capture-good-vibes.png"),
  },
  {
    id: "colorful",
    name: "Colorful",
    title: "Friends Forever",
    image: require("../../assets/images/templates/friends-forever.png"),
  },
  {
    id: "notebook",
    name: "Notebook",
    title: "School Memories",
    image: require("../../assets/images/templates/school-memories.png"),
  },
  {
    id: "premium",
    name: "Premium",
    title: "Make It Special",
    image: require("../../assets/images/templates/make-it-special.png"),
  },
];
