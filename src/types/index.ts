export interface CatListItem {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds: [];
  favourite: {};
}

export interface Breed {
  description?: string;
}

export interface CatItem {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds: Breed[];
}
