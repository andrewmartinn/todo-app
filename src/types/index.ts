import { IconType } from "react-icons";

export interface Todo {
  id: string;
  text: string;
  priority: string;
  completed: boolean;
}

export interface MenuIcon {
  id: number;
  text: string;
  icon: React.ReactNode;
}

export interface IconMap {
  [key: string]: IconType;
}
