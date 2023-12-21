export interface IPair {
  id: string;
  name: string;
}

export interface ISelectInputProp {
  list: IPair[];
  onChange: (selectedItem: IPair) => void;
}

export interface IToggleProp {
  label?: string;
  onChange: (enabled: boolean) => void;
}

export interface IPaginationProp {
  start: number;
  end: number;
  total: number;
  update: (direction: IPaginationDirection) => void;
}

export enum IPaginationDirection {
  PREV = "prev",
  NEXT = "next",
}
