interface IStatus {
  user: string;
  status: boolean;
}

export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  reviews: string[];
  readList: string[];
  wishList: string[];
  readStatus: IStatus[];
  addedBy: string;
}
