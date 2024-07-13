export interface Link {
  nameko: string;
  url: string;
  id: number;
  ord: number;
  Subject: {
    nameko: string;
    url: string;
    id: number;
    category_no: number;
    Series: {
      nameko: string;
      url: string;
      id: number;
      subject_no: number;
      Post: {
        id: number;
        url: string;
        nameko: string;
        lock: boolean;
        series_no: number;
      }[];
    }[];
  }[];
}
