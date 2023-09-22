export interface CatListItem {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds: [];
  favourite: {};
}

export interface Breed {
  id?: string;
  name?: string;
  description?: string;
}

export interface FilteredByBreed {
  id?: string;
  url?: string;
}

export interface CatItem {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds: Breed[];
}
