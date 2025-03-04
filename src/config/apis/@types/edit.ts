namespace EditResponse {
  export interface GetTags {
    status: number;
    success: boolean;
    data: Datum[];
    message: string;
  }

  export interface Datum {
    id: string;
    name: string;
    nameko: string;
    is_primary: boolean;
  }
}
